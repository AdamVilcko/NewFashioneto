package com.fashioneto.service;

import java.util.Date;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fashioneto.dao.CommentDAO;
import com.fashioneto.persistence.Comment;
import com.fashioneto.persistence.CommentParentTypeEnum;
import com.fashioneto.persistence.CommentStatus;
import com.fashioneto.persistence.LikeComment;
import com.fashioneto.persistence.User;
import com.fashioneto.utils.ContextUtils;
import com.fashioneto.utils.NoUserInContextException;

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
		Comment comment = entityManager.find(Comment.class, commentId);
		LikeComment like = new LikeComment();
		like.setComment(comment);
		like.setUser(new User(userId));

		if (!comment.getLikes().contains(like))
		{
			like = commentDAO.save(like);
		}

		return getNumberOfLikes(commentId);
	}

	@Override
	public int getNumberOfLikes(int commentId)
	{
		return commentDAO.getNumberOfLikes(commentId);
	}

	@Override
	public Comment deleteComment(int commentId)
	{
		Comment comment = getComment(commentId);
		comment.setStatus(CommentStatus.DELETED);
		return commentDAO.save(comment);
	}

	@Override
	public Comment addComment(CommentParentTypeEnum parentType, int parentId, String content)
			throws NoUserInContextException
	{
		Comment comment = new Comment();
		comment.setDate(new Date());
		comment.setUser(ContextUtils.getUserFromAuthenticationContext());
		comment.setContent(content);
		comment.setStatus(CommentStatus.ACTIVE);
		return commentDAO.saveNew(parentType, parentId, comment);
	}

	@Override
	public Comment getComment(int commentId)
	{
		return entityManager.find(Comment.class, commentId);
	}

}
