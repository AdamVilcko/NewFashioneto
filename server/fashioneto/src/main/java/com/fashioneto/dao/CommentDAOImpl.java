/*
 * Copyright Telrock Communications Limited 2008 * 
 *
 * $Header:  $
 * $Revision:  $
 * $Date:  $ 
 * 
 */
package com.fashioneto.dao;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fashioneto.persistence.Comment;
import com.fashioneto.persistence.LikeComment;

/**
 * @author Felipe Tonon 16 Mar 2014
 **/
@Transactional
@Service("commentDAO")
public class CommentDAOImpl implements CommentDAO
{
	@PersistenceContext
	private EntityManager entityManager;

	@Override
	public int getNumberOfLikes(int commentId)
	{
		TypedQuery<Long> query = entityManager.createQuery(
				"SELECT COUNT(lc) from LikeComment lc where comment.id=:commentId ", Long.class);
		query.setParameter("commentId", commentId);
		return query.getSingleResult().intValue();
	}

	@Override
	public Comment save(Comment comment) {
		return entityManager.merge(comment);
	}

	@Override
	public LikeComment save(LikeComment likeComment) {
		return entityManager.merge(likeComment);
	}

}
