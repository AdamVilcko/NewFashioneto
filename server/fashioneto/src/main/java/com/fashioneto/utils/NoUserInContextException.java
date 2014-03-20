/**
 * 
 */
package com.fashioneto.utils;

import javax.security.sasl.AuthenticationException;

/**
 * @author felipe
 *
 */
public class NoUserInContextException extends AuthenticationException {
	
	public NoUserInContextException(String string, Throwable throwable) {
		super(string);
	}

	public NoUserInContextException(String string) {
		super(string);
	}

	private static final long serialVersionUID = 7703501993859707838L;

}
