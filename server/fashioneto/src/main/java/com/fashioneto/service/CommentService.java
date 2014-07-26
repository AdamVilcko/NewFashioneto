package com.fashioneto.service;

import java.util.Set;

import com.fashioneto.persistence.Comment;
import com.fashioneto.persistence.CommentParentType;
import com.fashioneto.utils.NoUserInContextException;

/**
 * @author Felipe Tonon 16 Mar 2014
 **/
public interface CommentService
{
	/**
	 * @param userId
	 * @param commentId
	 * @return new number of likes
	 */
	public int addLike(int userId, int commentId);

	/**
	 * @param commentId
	 * @return
	 */
	public int getNumberOfLikes(int commentId);

	/**
	 * @param parentType
	 * @param parentId
	 * @param content
	 * @return Persisted instance of Comment
	 */
	public Comment addComment(CommentParentType parentType, int parentId, String content)
			throws NoUserInContextException;

	public Comment deleteComment(int commentId);

	public Comment getComment(int commentId);

	public Set<Comment> getComments(CommentParentType parentType, int parentId);
}
