/**
 * 
 */
package com.fashioneto.service;

import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.imageio.ImageIO;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import net.coobird.thumbnailator.Thumbnails;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fashioneto.dao.ImageDAO;
import com.fashioneto.persistence.Album;
import com.fashioneto.persistence.Image;
import com.fashioneto.persistence.User;
import com.fashioneto.utils.TokenUtils;
import com.fashioneto.ws.entities.ImageSizeEnum;

/**
 * @author felipe
 */
@Service("imageService")
@Transactional
public class ImageServiceImpl implements ImageService
{
	private static final String PATH = "/image-uploads/";
	private static final String DEFAULT_EXTENSION = "jpg";

	private String imagesPath = System.getProperty("user.home") + PATH;

	@Autowired
	private ImageDAO imageDAO;
	@Autowired
	private AlbumService albumService;

	@PersistenceContext
	private EntityManager entityManager;

	@Override
	public int like(User user, Image image)
	{
		image.addLiker(user);
		entityManager.merge(image);
		return image.getLikedBy().size();
	}

	@Override
	public int dislike(User user, Image image)
	{
		image.removeLiker(user);
		entityManager.merge(image);
		return image.getLikedBy().size();
	}

	@Override
	public Image uploadImage(User user, InputStream fileInputStream, String fileExtension) throws IOException
	{

		String newFilename = TokenUtils.createTokenImageName(user);
		//		saveFile(fileInputStream, imagesPath + newFilename + '.' + fileExtension);

		String imageFullPathName = getFullImagePath(newFilename, ImageSizeEnum.STANDARD);
		Thumbnails.of(fileInputStream).outputFormat(DEFAULT_EXTENSION).scale(1).toFile(imageFullPathName);

		File standardImage = new File(imageFullPathName);
		Thumbnails.of(standardImage).width(ImageSizeEnum.SMALL.getWidth()).outputFormat(DEFAULT_EXTENSION)
				.toFile(getFullImagePath(newFilename, ImageSizeEnum.SMALL));

		Thumbnails.of(standardImage).width(ImageSizeEnum.THUMBNAIL.getWidth()).outputFormat(DEFAULT_EXTENSION)
				.toFile(getFullImagePath(newFilename, ImageSizeEnum.THUMBNAIL));

		Image image = new Image();
		image.setDate(new Date());
		image.setFilename(newFilename);
		image.setUser(user);
		image.setFileExtension(DEFAULT_EXTENSION);

		Album album = albumService.getUploadAlbum(user);

		image.setAlbum(album);
		image = entityManager.merge(image);

		return image;
	}

	private String getFullImagePath(String filename, ImageSizeEnum imageSize)
	{
		return imagesPath + filename + imageSize.getSufix() + '.' + DEFAULT_EXTENSION;
	}

	@Override
	public ByteArrayOutputStream getImageContent(int id, ImageSizeEnum size) throws IOException
	{
		Image image = entityManager.find(Image.class, id);
		if (image != null)
		{
			String filePath = imagesPath + image.getFullFilename(size.getSufix());
			InputStream inputStream = new FileInputStream(new File(filePath));
			BufferedImage buffered = ImageIO.read(inputStream);
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			ImageIO.write(buffered, image.getFileExtension(), baos);
			return baos;
		}
		return null;
	}

	@Override
	public List<Image> getImages(int userId)
	{
		return imageDAO.getImages(userId);
	}

	@Override
	public List<Integer> getImageIds(int userId)
	{
		List<Integer> ids = new ArrayList<Integer>();
		List<Image> images = imageDAO.getImages(userId);
		if (images != null)
		{
			for (Image image : imageDAO.getImages(userId))
			{
				ids.add(image.getId());
			}
		}
		return ids;
	}

	@Override
	public Image getImage(int imageId)
	{
		return entityManager.find(Image.class, imageId);
	}

}
