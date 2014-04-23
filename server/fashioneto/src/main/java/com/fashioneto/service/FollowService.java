package com.fashioneto.service;

import com.fashioneto.persistence.User;

/**
 * @author felipe
 *
 */
public interface FollowService {

	public boolean follow(User user,  User followedUser);
}
