package com.fashioneto.ws.rest;

import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.fashioneto.persistence.User;
import com.fashioneto.service.UserService;
import com.fashioneto.ws.json.FashionetoJsonFactory;

/**
 * @author Felipe Tonon 22 Apr 2014
 **/
@Component
@Path("/people")
public class PeopleRestBean
{
	@Autowired
	private UserService userService;

	@GET
	public Response getUsers()
	{
		List<User> users = userService.getUsers();
		return Response.status(Status.OK).entity(FashionetoJsonFactory.getJson(users)).build();
	}
}
