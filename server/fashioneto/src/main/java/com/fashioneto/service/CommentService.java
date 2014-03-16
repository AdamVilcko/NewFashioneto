package com.fashioneto.service;

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
}
