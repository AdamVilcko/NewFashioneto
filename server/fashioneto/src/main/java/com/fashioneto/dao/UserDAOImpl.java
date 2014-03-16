/*
 * Copyright Telrock Communications Limited 2008 * 
 *
 * $Header:  $
 * $Revision:  $
 * $Date:  $ 
 * 
 */
package com.fashioneto.dao;

import org.springframework.stereotype.Service;

import com.fashioneto.persistence.User;

/**
 * @author Felipe Tonon 24 Jan 2014
 **/

@Service("userDAO")
public class UserDAOImpl implements UserDAO
{

	@Override
	public User getUser(int id)
	{
		// TODO Auto-generated method stub
		return null;
	}

}
