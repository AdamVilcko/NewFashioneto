package com.fashioneto.persistence;

import java.util.Collection;
import java.util.HashSet;

/**
 * @author Felipe Tonon 9 Mar 2014
 **/
public class CommentSet extends HashSet<Comment>
{

	public CommentSet(Collection<? extends Comment> c)
	{
		super(c);
		// TODO Auto-generated constructor stub
	}

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

}
