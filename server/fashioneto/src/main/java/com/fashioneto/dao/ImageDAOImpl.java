package com.fashioneto.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fashioneto.persistence.Image;

/**
 * @author Felipe Tonon 22 Apr 2014
 **/
@Transactional
@Service("imageDAO")
public class ImageDAOImpl implements ImageDAO
{

	@PersistenceContext
	private EntityManager entityManager;

	@Override
	public List<Image> getImages(int userId)
	{
		TypedQuery<Image> query = entityManager.createQuery("from Image where user.id=:userId ", Image.class);
		query.setParameter("userId", userId);
		return query.getResultList();
	}

}
