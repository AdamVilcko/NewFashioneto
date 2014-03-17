/*
 * Copyright Telrock Communications Limited 2008 * 
 *
 * $Header:  $
 * $Revision:  $
 * $Date:  $ 
 * 
 */
package com.fashioneto.dao;

import com.fashioneto.persistence.Comment;
import com.fashioneto.persistence.LikeComment;

/**
 * @author Felipe Tonon 16 Mar 2014
 **/
public interface CommentDAO
{
	/**
	 * @param commentId
	 * @return
	 */
	public int getNumberOfLikes(int commentId);

	public Comment save(Comment comment);
	
	public LikeComment save(LikeComment likeComment);
}
