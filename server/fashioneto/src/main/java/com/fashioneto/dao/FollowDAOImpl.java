package com.fashioneto.dao;

import java.util.Date;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author Felipe Tonon 23 Apr 2014
 **/
@Transactional
@Service("followDAO")
public class FollowDAOImpl implements FollowDAO
{

	@PersistenceContext
	private EntityManager entityManager;

	@Override
	public int follow(int idUser, int idFollowedUser)
	{
		String sql = "INSERT INTO follow_user (id_user,id_followed_user, date) values (:id_user, :id_followed_user, :date);";
		Query query = entityManager.createNativeQuery(sql);
		query.setParameter("id_user", idUser);
		query.setParameter("id_followed_user", idFollowedUser);
		query.setParameter("date", new Date());
		return query.executeUpdate();
	}

	@Override
	public int unfollow(int idUser, int idFollowedUser)
	{
		String sql = "DELETE FROM follow_user where id_user = :id_user and id_followed_user = :id_followed_user ;";
		Query query = entityManager.createNativeQuery(sql);
		query.setParameter("id_user", idUser);
		query.setParameter("id_followed_user", idFollowedUser);
		return query.executeUpdate();
	}

}
