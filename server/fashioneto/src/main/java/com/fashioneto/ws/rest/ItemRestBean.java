/**
 * 
 */
package com.fashioneto.ws.rest;

import java.io.IOException;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.fashioneto.persistence.Item;
import com.fashioneto.persistence.User;
import com.fashioneto.service.ItemService;
import com.fashioneto.service.UserService;
import com.fashioneto.utils.ContextUtils;
import com.fashioneto.ws.entities.DefaultSet;
import com.fashioneto.ws.entities.LikesWrapper;
import com.fashioneto.ws.json.FashionetoJsonFactory;

/**
 * @author Felipe
 *
 */
@Component
@Path("/item")
public class ItemRestBean {
	
	@Autowired
	private ItemService itemService;
	@Autowired
	private UserService userService;	
	
	@GET
	@Path("s/{userId}")
	public Response getItemList(@PathParam("userId")
	int userId) throws IOException
	{
		DefaultSet<Item> items = itemService.getItems(userId);
		return Response.status(Status.OK).entity(FashionetoJsonFactory.getJsonFromObject(items)).build();
	}
	
	@POST
	@Path("like/{itemId}")
	public Response likeComment(@PathParam("itemId")
	int itemId) throws Exception
	{
		//http://localhost:8080/Fashioneto/as/item/like/1
		if (itemId > 0)
		{
			User user = ContextUtils.getUserFromAuthenticationContext();

			int likesCount = itemService.like(user.getId(), itemId);

			LikesWrapper likesWrapper = new LikesWrapper(likesCount, true);
			return Response.status(Status.OK).entity(FashionetoJsonFactory.getJsonFromObject(likesWrapper)).build();
		}

		return Response.status(Status.NOT_FOUND).build();
	}

}
