package com.fashioneto.dao;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.fashioneto.persistence.User;

/**
 * @author Felipe Tonon 24 Jan 2014
 **/

//@Service("userDAO")
public class UserDAOImpl implements UserDAO
{

	@Override
	public User getUser(int id)
	{
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public User findByName(String name)
	{
		return new User(1);
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException
	{
		User user = this.findByName(username);
		if (null == user)
		{
			throw new UsernameNotFoundException("The user with name " + username + " was not found");
		}

		return user;
	}

}
