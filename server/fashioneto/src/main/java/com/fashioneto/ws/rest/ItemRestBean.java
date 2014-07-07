/**
 * 
 */
package com.fashioneto.ws.rest;

import javax.ws.rs.DELETE;
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
import com.fashioneto.utils.NoUserInContextException;
import com.fashioneto.ws.entities.LikesWrapper;
import com.fashioneto.ws.json.FashionetoJsonFactory;

/**
 * @author Felipe
 */
@Component
@Path("/item")
public class ItemRestBean
{

	@Autowired
	private ItemService itemService;
	@Autowired
	private UserService userService;

	@POST
	@Path("like/{itemId}")
	public Response likeComment(@PathParam("itemId")
	int itemId) throws Exception
	{
		if (itemId < 1)
		{
			return Response.status(Status.NOT_ACCEPTABLE).build();
		}

		Item item = itemService.getItem(itemId);

		if (item == null)
		{
			item = itemService.createItem(itemId);
		}
		return like(item, true);
	}

	@DELETE
	@Path("like/{itemId}")
	public Response dislikeComment(@PathParam("itemId")
	int itemId) throws Exception
	{
		Item item = itemService.getItem(itemId);
		return like(item, false);
	}

	private Response like(Item item, boolean isAdding) throws NoUserInContextException
	{
		// http://localhost:8080/Fashioneto/as/item/like/443831786

		if (item != null)
		{
			User user = ContextUtils.getUserFromAuthenticationContext();

			int likesCount;
			if (isAdding)
			{
				likesCount = itemService.like(user, item);
			}
			else
			{
				likesCount = itemService.dislike(user, item);
			}

			LikesWrapper likesWrapper = new LikesWrapper(likesCount, isAdding);
			return Response.status(Status.OK).entity(FashionetoJsonFactory.getJsonFromObject(likesWrapper)).build();
		}

		return Response.status(Status.NOT_FOUND).build();
	}

}
