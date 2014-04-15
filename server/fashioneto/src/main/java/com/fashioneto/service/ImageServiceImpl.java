/**
 * 
 */
package com.fashioneto.service;

import java.io.ByteArrayOutputStream;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Service;

import com.fashioneto.persistence.Image;

/**
 * @author felipe
 */
@Service("imageService")
public class ImageServiceImpl implements ImageService
{

	@PersistenceContext
	private EntityManager entityManager;

	@Override
	public ByteArrayOutputStream getImageContent(int id, String size)
	{
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Image> getImages(int userId)
	{
		// TODO Auto-generated method stub
		return null;
	}

}
