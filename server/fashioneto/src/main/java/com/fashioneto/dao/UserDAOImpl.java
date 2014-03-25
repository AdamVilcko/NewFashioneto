package com.fashioneto.dao;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.fashioneto.persistence.User;

/**
 * @author Felipe Tonon 24 Jan 2014
 **/

//@Service("userDAO")
public class UserDAOImpl implements UserDAO
{

	@PersistenceContext
	private EntityManager entityManager;

	@Override
	public User getUser(int id)
	{
		return entityManager.find(User.class, id);
	}

	@Override
	public User findByName(String name)
	{
		System.out.println("\n\n ************ Looking for user: " + name);
		TypedQuery<User> query = entityManager.createQuery("from User where username=:username ", User.class);
		query.setParameter("username", name);
		User user = query.getSingleResult();
		String userStri = "NULL";
		if (user != null)
		{
			userStri = user.toString();
		}
		System.out.println("\n\n ************User found: " + userStri);
		return user;
	}

	@Override
	public User loadUserByUsername(String username) throws UsernameNotFoundException
	{
		User user = this.findByName(username);
		if (null == user)
		{
			throw new UsernameNotFoundException("The user with name " + username + " was not found");
		}

		return user;
	}

}

