package com.fashioneto.ws.rest;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.fashioneto.persistence.User;
import com.fashioneto.service.FollowService;
import com.fashioneto.service.UserService;
import com.fashioneto.utils.ContextUtils;
import com.fashioneto.utils.NoUserInContextException;

@Component
@Path("/follow")
public class FollowRestBean {
	
	@Autowired
	private FollowService followService;
	
	@Autowired
	private UserService userService;
	
	@Path("{idFollowedUser}")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	public Response authenticate(@PathParam("idFollowedUser")
	int idFollowedUser) throws NoUserInContextException
	{
		User user = ContextUtils.getUserFromAuthenticationContext();
		User followedUser = userService.getUser(idFollowedUser);
		
		if (user == null || followedUser == null)
		{
			return Response.status(Status.NOT_FOUND).build();
		} else if (user.getId() == followedUser.getId()) 
		{
			return Response.status(Status.UNAUTHORIZED).build();
		}
		
		if (followService.follow(user, followedUser)) 
		{
			return Response.status(Status.OK).build();
		}
		return Response.status(Status.NOT_MODIFIED).build();
	}
}
