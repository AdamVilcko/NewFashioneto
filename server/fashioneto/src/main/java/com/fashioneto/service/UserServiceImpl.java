/*
 * Copyright Telrock Communications Limited 2008 * 
 *
 * $Header:  $
 * $Revision:  $
 * $Date:  $ 
 * 
 */
package com.fashioneto.service;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Service;

import com.fashioneto.persistence.User;

@Service("fashionetoerService")
public class UserServiceImpl implements UserService
{
	@PersistenceContext
	private EntityManager entityManager;

	@Override
	public List<User> getFashionetoers()
	{
		return null;
	}

	@Override
	public User getFashionetoer(int id)
	{
		User user = entityManager.find(User.class, id);
		return user;
	}
}
