package com.fashioneto.ws.entities;

import java.util.Collection;
import java.util.HashSet;

/**
 * @author Felipe Tonon 9 Mar 2014
 **/
public class DefaultSet<T> extends HashSet<T>
{

	private static final long serialVersionUID = 1L;

	public DefaultSet(Collection<? extends T> c)
	{
		super(c);
	}

}
