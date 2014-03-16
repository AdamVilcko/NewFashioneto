/*
 * Copyright Telrock Communications Limited 2008 * 
 *
 * $Header:  $
 * $Revision:  $
 * $Date:  $ 
 * 
 */
package com.fashioneto.dao;

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

	public <T> T merge(T entity);
}
