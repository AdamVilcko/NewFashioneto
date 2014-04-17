/**
 * 
 */
package com.fashioneto.service;

import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import javax.imageio.ImageIO;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Service;

import com.fashioneto.persistence.Image;
import com.fashioneto.ws.entities.ImageSizeEnum;

/**
 * @author felipe
 */
@Service("imageService")
public class ImageServiceImpl implements ImageService
{

	private static final String PATH = "/uploads/images/";

	@PersistenceContext
	private EntityManager entityManager;

	@Override
	public ByteArrayOutputStream getImageContent(int id, ImageSizeEnum size) throws IOException
	{
		Image image = entityManager.find(Image.class, id);
		if (image != null)
		{
			String filePath = PATH + image.getFullFilename(size.getSufix());
			InputStream inputStream = getClass().getClassLoader().getResourceAsStream(filePath);
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
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getImagePath(int userId)
	{
		// TODO Auto-generated method stub
		return null;
	}

}
