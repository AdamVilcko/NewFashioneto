/**
 * 
 */
package com.fashioneto.service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fashioneto.dao.FollowDAO;
import com.fashioneto.persistence.User;

/**
 * @author felipe
 *
 */
@Service("followService")
public class FollowServiceImpl implements FollowService {

	@PersistenceContext
	private EntityManager entityManager;

	@Autowired
	private FollowDAO followDAO;
	
	@Override
	public boolean follow(User user, User followedUser) {
		
		if (followedUser.getFollowers().contains(user))
		{
			return false;
		}
		return followDAO.follow(user.getId(), followedUser.getId()) > 0;
	}

}
