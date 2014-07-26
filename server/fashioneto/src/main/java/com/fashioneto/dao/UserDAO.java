package com.fashioneto.dao;

import java.util.List;

import org.springframework.security.core.userdetails.UserDetailsService;

import com.fashioneto.persistence.User;
import com.fashioneto.persistence.UserStatus;

/**
 * @author Felipe Tonon 24 Jan 2014
 **/
public interface UserDAO extends UserDetailsService
{

	public User getUser(int id);

	public User findByName(String name);

	public List<User> findAll();

	public User findByEmailAndStatus(String email, UserStatus userStatus);
}
