/**
 * 
 */
package com.fashioneto.service;

import java.util.List;

import com.fashioneto.persistence.User;

/**
 * @author Felipe
 */
public interface UserService
{

	public List<User> getFashionetoers();

	public User getFashionetoer(int id);

}
