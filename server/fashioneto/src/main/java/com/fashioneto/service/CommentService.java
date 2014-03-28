package com.fashioneto.service;

import com.fashioneto.persistence.Comment;
import com.fashioneto.persistence.CommentParentTypeEnum;
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
	public Comment addComment(CommentParentTypeEnum parentType, int parentId, String content)
			throws NoUserInContextException;
}
