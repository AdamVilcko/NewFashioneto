package com.fashioneto.service;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fashioneto.dao.UserDAO;
import com.fashioneto.persistence.Album;
import com.fashioneto.persistence.User;

@Service("userService")
@Transactional
public class UserServiceImpl implements UserService
{

	@PersistenceContext
	private EntityManager entityManager;

	@Autowired
	private UserDAO userDAO;

	@Override
	public List<User> getUsers()
	{
		return userDAO.findAll();
	}

	@Override
	public User getUser(int id)
	{
		return userDAO.getUser(id);
	}

	@Override
	public User getUser(String username)
	{
		return userDAO.findByName(username);
	}

	@Override
	public User saveUser(User user)
	{
		if (user == null)
		{
			return null;
		}

		user = entityManager.merge(user);
		if (user.getId() < 1)
		{
			entityManager.merge(new Album(AlbumService.ALBUM_UPLOADS, user));
			entityManager.merge(new Album(AlbumService.ALBUM_PROFILE, user));
		}

		return user;
	}

}
