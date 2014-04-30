package com.fashioneto.ws.rest;

import javax.ws.rs.DELETE;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.fashioneto.persistence.User;
import com.fashioneto.service.FollowService;
import com.fashioneto.service.UserService;
import com.fashioneto.utils.ContextUtils;
import com.fashioneto.utils.NoUserInContextException;
import com.fashioneto.ws.entities.FollowWrapper;
import com.fashioneto.ws.json.FashionetoJsonFactory;

@Component
@Path("/follow")
public class FollowRestBean
{

	@Autowired
	private FollowService followService;

	@Autowired
	private UserService userService;

	@Path("{idFollowedUser}")
	@POST
	public Response follow(@PathParam("idFollowedUser")
	int idFollowedUser) throws NoUserInContextException
	{
		User user = ContextUtils.getUserFromAuthenticationContext();
		User followedUser = userService.getUser(idFollowedUser);

		if (user == null || followedUser == null)
		{
			return Response.status(Status.NOT_FOUND).build();
		}
		else if (user.getId() == followedUser.getId())
		{
			return Response.status(Status.FORBIDDEN).build();
		}

		if (followService.follow(user, followedUser))
		{
			FollowWrapper followWrapper = new FollowWrapper(idFollowedUser, true);
			return Response.status(Status.OK).entity(FashionetoJsonFactory.getJsonFromObject(followWrapper)).build();
		}
		// 208 = Already reported
		return Response.status(208).build();
	}

	@Path("{idFollowedUser}")
	@DELETE
	public Response unfollow(@PathParam("idFollowedUser")
	int idFollowedUser) throws NoUserInContextException
	{
		User user = ContextUtils.getUserFromAuthenticationContext();
		User followedUser = userService.getUser(idFollowedUser);

		if (user == null || followedUser == null)
		{
			return Response.status(Status.NOT_FOUND).build();
		}
		else if (user.getId() == followedUser.getId())
		{
			return Response.status(Status.FORBIDDEN).build();
		}

		if (followService.unfollow(user, followedUser))
		{
			FollowWrapper followWrapper = new FollowWrapper(idFollowedUser, false);
			return Response.status(Status.OK).entity(FashionetoJsonFactory.getJsonFromObject(followWrapper)).build();
		}
		// 208 = Already reported
		return Response.status(208).build();
	}
}
