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
import net.coobird.thumbnailator.geometry.Positions;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fashioneto.dao.ImageDAO;
import com.fashioneto.persistence.Album;
import com.fashioneto.persistence.Image;
import com.fashioneto.persistence.User;
import com.fashioneto.utils.TokenUtils;
import com.fashioneto.ws.entities.ImageSize;

/**
 * @author felipe
 */
@Service("imageService")
@Transactional
public class ImageServiceImpl implements ImageService {
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
    public int like(User user, Image image) {
	image.addLiker(user);
	entityManager.merge(image);
	return image.getLikedBy().size();
    }

    @Override
    public int dislike(User user, Image image) {
	image.removeLiker(user);
	entityManager.merge(image);
	return image.getLikedBy().size();
    }

    @Override
    public Image uploadProfilePicture(User user, InputStream fileInputStream, String fileExtension) throws IOException {
	Album profileAlbum = albumService.getProfileAlbum(user);
	Image newProfileImage = uploadImage(user, fileInputStream, fileExtension, profileAlbum);
	
	user.setProfileImage(newProfileImage);
	entityManager.merge(user);
	
	return newProfileImage;
    }

    @Override
    public Image uploadImage(User user, InputStream fileInputStream, String fileExtension, Album album) throws IOException {

	String newFilename = TokenUtils.createTokenImageName(user);

	String imageFullPathName = getFullImagePath(newFilename, ImageSize.STANDARD);
	Thumbnails.of(fileInputStream).outputFormat(DEFAULT_EXTENSION).scale(1).toFile(imageFullPathName);

	fileInputStream.close();

	File standardImage = new File(imageFullPathName);
	Thumbnails.of(standardImage).crop(Positions.CENTER).size(ImageSize.WALL.getWidth(), ImageSize.WALL.getWidth())
		.outputFormat(DEFAULT_EXTENSION).toFile(getFullImagePath(newFilename, ImageSize.WALL));

	Thumbnails.of(standardImage).width(ImageSize.SMALL.getWidth()).outputFormat(DEFAULT_EXTENSION)
		.toFile(getFullImagePath(newFilename, ImageSize.SMALL));

	Thumbnails.of(standardImage).width(ImageSize.THUMBNAIL.getWidth()).outputFormat(DEFAULT_EXTENSION)
		.toFile(getFullImagePath(newFilename, ImageSize.THUMBNAIL));

	Image image = new Image();
	image.setDate(new Date());
	image.setFilename(newFilename);
	image.setUser(user);
	image.setFileExtension(DEFAULT_EXTENSION);

	image.setAlbum(album);
	image = entityManager.merge(image);

	System.gc();

	return image;
    }

    private String getFullImagePath(String filename, ImageSize imageSize) {
	return imagesPath + filename + imageSize.getSufix() + '.' + DEFAULT_EXTENSION;
    }

    @Override
    public ByteArrayOutputStream getImageContent(int id, ImageSize size) throws IOException {
	Image image = entityManager.find(Image.class, id);
	if (image != null) {
	    String filePath = imagesPath + image.getFullFilename(size.getSufix());
	    InputStream inputStream = new FileInputStream(new File(filePath));
	    BufferedImage buffered = ImageIO.read(inputStream);
	    ByteArrayOutputStream baos = new ByteArrayOutputStream();
	    ImageIO.write(buffered, image.getFileExtension(), baos);
	    buffered.flush();
	    inputStream.close();
	    System.gc();
	    return baos;
	}
	return null;
    }

    @Override
    public List<Image> getImages(int userId) {
	return imageDAO.getImages(userId);
    }

    @Override
    public List<Integer> getImageIds(int userId) {
	List<Integer> ids = new ArrayList<Integer>();
	List<Image> images = imageDAO.getImages(userId);
	if (images != null) {
	    for (Image image : imageDAO.getImages(userId)) {
		ids.add(image.getId());
	    }
	}
	return ids;
    }

    @Override
    public Image getImage(int imageId) {
	return entityManager.find(Image.class, imageId);
    }

}
