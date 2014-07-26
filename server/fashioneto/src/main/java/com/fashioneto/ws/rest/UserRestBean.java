package com.fashioneto.ws.rest;

import java.util.HashMap;
import java.util.Map;

import javax.ws.rs.Consumes;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.h2.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import com.fashioneto.persistence.User;
import com.fashioneto.persistence.UserStatus;
import com.fashioneto.service.UserNotInvitedException;
import com.fashioneto.service.UserService;
import com.fashioneto.service.UsernameInUseException;
import com.fashioneto.utils.ContextUtils;
import com.fashioneto.utils.NoUserInContextException;
import com.fashioneto.utils.TokenUtils;
import com.fashioneto.ws.entities.ContentWrapper;
import com.fashioneto.ws.entities.TokenTransfer;
import com.fashioneto.ws.entities.UserSignupWrapper;
import com.fashioneto.ws.json.FashionetoJsonFactory;
import com.google.gson.JsonObject;

/**
 * @author Felipe Tonon 20 Mar 2014
 **/
@Component
@Path("/user")
public class UserRestBean {
    @Autowired
    private UserDetailsService userService;

    @Autowired
    private UserService userServiceImpl;

    @Autowired
    @Qualifier("authenticationManager")
    private AuthenticationManager authManager;

    /**
     * Retrieves the currently logged in user.
     * 
     * @return A transfer containing the username and the roles.
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getUser() {

	Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
	Object principal = authentication.getPrincipal();
	if (principal instanceof String && ((String) principal).equals("anonymousUser")) {
	    throw new WebApplicationException(401);
	}
	User user = (User) principal;
	return Response.status(Status.OK).entity(FashionetoJsonFactory.getJson(user)).build();
    }

    @GET
    @Path("available/{username}")
    public Response isUsernameAvaliable(@PathParam("username") String username) {
	User user = userServiceImpl.getUser(username);
	String jsonReturn = FashionetoJsonFactory.getJsonFromObject(new Boolean(user == null));
	return Response.status(Status.OK).entity(jsonReturn).build();
    }

    @GET
    @Path("{username}")
    public Response getUserById(@PathParam("username") String username) {
	User user;
	if (StringUtils.isNumber(username)) {
	    user = userServiceImpl.getUser(Integer.parseInt(username));
	} else {
	    user = userServiceImpl.getUser(username);
	}

	if (user == null) {
	    return Response.status(Status.NOT_FOUND).build();
	}

	return Response.status(Status.OK).entity(FashionetoJsonFactory.getJson(user)).build();
    }

    /**
     * Authenticates a user and creates an authentication token.
     * 
     * @param username
     *            The name of the user.
     * @param password
     *            The password of the user.
     * @return A transfer containing the authentication token.
     */
    @Path("authenticate")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response authenticate(@FormParam("username") String username, @FormParam("password") String password) {

	UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username,
		password);
	Authentication authentication = this.authManager.authenticate(authenticationToken);
	SecurityContextHolder.getContext().setAuthentication(authentication);

	/*
	 * Reload user as password of authentication principal will be null
	 * after authorization and password is needed for token generation
	 */
	UserDetails userDetails = this.userService.loadUserByUsername(username);

	User user = null;

	if (userDetails instanceof User) {
	    user = (User) userDetails;
	}

	TokenTransfer tokenTransfer = new TokenTransfer(TokenUtils.createToken(userDetails));

	JsonObject jsonObject = new JsonObject();

	jsonObject.add("user", FashionetoJsonFactory.getJsonElement(user));
	jsonObject.addProperty("token", tokenTransfer.getToken());

	return Response.status(Status.OK).entity(FashionetoJsonFactory.getJson(jsonObject)).build();
    }

    private Map<String, Boolean> createRoleMap(UserDetails userDetails) {

	Map<String, Boolean> roles = new HashMap<String, Boolean>();
	for (GrantedAuthority authority : userDetails.getAuthorities()) {
	    roles.put(authority.getAuthority(), Boolean.TRUE);
	}

	return roles;
    }

    @Path("signup")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response signup(UserSignupWrapper userSignupWrapper) {
	User user;
	try {
	    user = userServiceImpl.signupUser(userSignupWrapper.getUsername(), userSignupWrapper.getEmail(),
		    userSignupWrapper.getPassword(), userSignupWrapper.getDisplayName());
	} catch (UsernameInUseException e) {
	    return Response.status(Status.CONFLICT).entity(e.getMessage()).build();
	} catch (UserNotInvitedException e) {
	    return Response.status(Status.UNAUTHORIZED).entity(e.getMessage()).build();
	}
	return Response.status(Status.OK).entity(FashionetoJsonFactory.getJson(user)).build();
    }
    
    @Path("invite")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response invite(ContentWrapper content) throws NoUserInContextException {
	String email = content.getContent();
	User user = ContextUtils.getUserFromAuthenticationContext();
	if (userServiceImpl.inviteUser(user, email)) {
	    return Response.status(Status.OK).build();
	} else {
	    return Response.status(Status.NOT_MODIFIED).build();
	}
    }    

}
