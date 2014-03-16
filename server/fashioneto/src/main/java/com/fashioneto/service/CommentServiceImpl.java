package com.fashioneto.service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fashioneto.dao.CommentDAO;
import com.fashioneto.persistence.Comment;
import com.fashioneto.persistence.LikeComment;
import com.fashioneto.persistence.User;

/**
 * @author Felipe Tonon 16 Mar 2014
 **/
@Service("commentService")
public class CommentServiceImpl implements CommentService
{

	@PersistenceContext
	private EntityManager entityManager;

	@Autowired
	private CommentDAO commentDAO;

	@Override
	public int addLike(int userId, int commentId)
	{
		LikeComment like = new LikeComment();
		like.setComment(entityManager.find(Comment.class, commentId));
		like.setUser(entityManager.find(User.class, userId));

		like = commentDAO.merge(like);
		return getNumberOfLikes(commentId);
	}

	@Override
	public int getNumberOfLikes(int commentId)
	{
		return commentDAO.getNumberOfLikes(commentId);
	}

}
