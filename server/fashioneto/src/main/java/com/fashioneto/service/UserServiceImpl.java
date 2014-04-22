package com.fashioneto.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fashioneto.dao.UserDAO;
import com.fashioneto.persistence.User;

@Service("userService")
public class UserServiceImpl implements UserService
{
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

}
