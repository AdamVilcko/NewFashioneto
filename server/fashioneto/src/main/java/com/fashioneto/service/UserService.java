/**
 * 
 */
package com.fashioneto.service;

import java.util.List;

import com.fashioneto.persistence.User;
import com.fashioneto.persistence.UserStatus;

/**
 * @author Felipe
 */
public interface UserService
{

	public List<User> getUsers();

	public User getUser(int id);

	public User getUser(String username);

	public User saveUser(User user);

	public User signupUser(String username, String email, String password, String displayName) throws UsernameInUseException, UserNotInvitedException;

	public User getUserByEmailAndStatus(String email, UserStatus userStatus);

	public boolean inviteUser(User user, String email);

}
