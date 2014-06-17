/**
 * 
 */
package com.fashioneto.service;

import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.imageio.ImageIO;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fashioneto.dao.ImageDAO;
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

	@PersistenceContext
	private EntityManager entityManager;

	@Override
	public Image uploadImage(User user, InputStream fileInputStream, String fileExtension) throws IOException
	{

		String newFilename = TokenUtils.createTokenImageName(user);
		saveFile(fileInputStream, imagesPath + newFilename + '.' + fileExtension);

		Image image = new Image();
		image.setDate(new Date());
		image.setFilename(newFilename);
		image.setUser(user);
		image.setFileExtension(fileExtension);
		image = entityManager.merge(image);

		return image;
	}

	// save uploaded file to a defined location on the server
	private void saveFile(InputStream uploadedInputStream, String serverLocation) throws IOException
	{

		OutputStream outpuStream = null;
		int read = 0;
		byte[] bytes = new byte[1024];

		outpuStream = new FileOutputStream(new File(serverLocation));
		while ((read = uploadedInputStream.read(bytes)) != -1)
		{
			outpuStream.write(bytes, 0, read);
		}
		outpuStream.flush();
		outpuStream.close();

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
	public String getImagePath(int userId)
	{
		// TODO Auto-generated method stub
		return null;
	}

}
