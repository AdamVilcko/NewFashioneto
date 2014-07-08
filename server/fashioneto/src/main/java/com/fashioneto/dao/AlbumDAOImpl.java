package com.fashioneto.dao;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fashioneto.persistence.Album;
import com.fashioneto.persistence.User;

/**
 * @author Felipe Tonon 8 Jul 2014
 **/
@Transactional
@Service("albumDAO")
public class AlbumDAOImpl implements AlbumDAO
{

	@PersistenceContext
	private EntityManager entityManager;

	@Override
	public Album getAlbumByName(User user, String name)
	{
		TypedQuery<Album> query = entityManager.createQuery("from Album where user=:user and name=:name", Album.class);
		query.setParameter("user", user);
		query.setParameter("name", name);
		return query.getSingleResult();

	}

}
