/**
 * 
 */
package com.fashioneto.utils;


/**
 * @author felipe
 */
public class NoUserInContextException extends Exception
{

	public NoUserInContextException(String string, Throwable throwable)
	{
		super(string);
	}

	public NoUserInContextException(String string)
	{
		super(string);
	}

	private static final long serialVersionUID = 7703501993859707838L;

}
