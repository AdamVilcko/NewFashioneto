package com.fashioneto.utils;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import com.fashioneto.persistence.User;

/**
 * @author felipe
 */
public class ContextUtils {

    public static User getUserFromAuthenticationContext() throws NoUserInContextException {
	Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
	Object principal = authentication.getPrincipal();

	if (!(principal instanceof User)) {
	    throw new NoUserInContextException("Authentication's principal wasn't an instance of "
		    + User.class.getCanonicalName());
	}
	return (User) principal;

    }

    public static boolean isFollowed(User user) throws NoUserInContextException {
	User loggedUser = getUserFromAuthenticationContext();
	return loggedUser.getId() != user.getId() && user.getFollowers().contains(loggedUser);
    }

}
