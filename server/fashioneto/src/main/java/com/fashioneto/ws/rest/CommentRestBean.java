package com.fashioneto.ws.rest;

import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.fashioneto.persistence.CommentParentTypeEnum;
import com.fashioneto.persistence.User;
import com.fashioneto.service.UserService;
import com.fashioneto.ws.json.FashionetoJsonFactory;

/**
 * @author Felipe Tonon 13 Mar 2014
 **/
@Path("/comment")
@Component
public class CommentRestBean
{

	//http://localhost:8080/Fashioneto/rest/comment/USER/1

	@Autowired
	protected UserService userService;

	@PUT
	public Response getMsgPut()
	{
		return null;
	}

	@GET
	@Path("/{parentType}/{parentId}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getMsg(@PathParam("parentType")
	CommentParentTypeEnum parentType, @PathParam("parentId")
	int parentId)
	{
		User user = userService.getFashionetoer(parentId);
		if (parentType.equals(CommentParentTypeEnum.USER) && user != null)
		{

			user.getReceivedComments();

			String jsonOutput = FashionetoJsonFactory.getJson(user.getReceivedCommentsCommentSet());

			return Response.status(Status.OK).entity(jsonOutput).build();
		}
		return Response.status(Status.NOT_FOUND).build();
	}
}
