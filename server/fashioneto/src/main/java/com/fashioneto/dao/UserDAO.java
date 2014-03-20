package com.fashioneto.dao;

import org.springframework.security.core.userdetails.UserDetailsService;

import com.fashioneto.persistence.User;

/**
 * @author Felipe Tonon 24 Jan 2014
 **/
public interface UserDAO extends UserDetailsService
{

	public User getUser(int id);

	public User findByName(String name);
}
