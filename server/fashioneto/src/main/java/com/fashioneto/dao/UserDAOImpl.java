package com.fashioneto.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.fashioneto.persistence.User;
import com.fashioneto.persistence.UserStatus;

/**
 * @author Felipe Tonon 24 Jan 2014
 **/

// @Service("userDAO")
public class UserDAOImpl implements UserDAO {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public User getUser(int id) {
	return entityManager.find(User.class, id);
    }

    @Override
    public User findByName(String name) {
	TypedQuery<User> query = entityManager.createQuery("from User where username=:username ", User.class);
	query.setParameter("username", name);

	User user = null;
	try {
	    user = query.getSingleResult();
	} catch (NoResultException e) {
	    // No user found
	}
	return user;
    }

    @Override
    public User loadUserByUsername(String username) throws UsernameNotFoundException {
	User user = this.findByName(username);
	if (null == user) {
	    throw new UsernameNotFoundException("The user with name " + username + " was not found");
	}

	return user;
    }

    @Override
    public List<User> findAllActive() {
	TypedQuery<User> query = entityManager.createQuery("FROM User where status=:status", User.class);
	query.setParameter("status", UserStatus.ACTIVE);
	return query.getResultList();
    }

    @Override
    public User findByEmailAndStatus(String email, UserStatus userStatus) {
	TypedQuery<User> query = entityManager.createQuery("from User where email=:email and status=:status", User.class);
	query.setParameter("email", email);
	query.setParameter("status", userStatus);

	User user = null;
	try {
	    user = query.getSingleResult();
	} catch (NoResultException e) {
	    // No user found
	}
	return user;
    }

}
