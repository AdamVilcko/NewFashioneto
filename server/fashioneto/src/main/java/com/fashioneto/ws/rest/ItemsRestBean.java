/**
 * 
 */
package com.fashioneto.ws.rest;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.fashioneto.persistence.Item;
import com.fashioneto.service.ItemService;
import com.fashioneto.ws.entities.DefaultSet;
import com.fashioneto.ws.json.FashionetoJsonFactory;

/**
 * @author Felipe
 */
@Component
@Path("/items")
public class ItemsRestBean
{

	@Autowired
	private ItemService itemService;

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response getItems(List<Integer> itemIds) throws Exception
	{
		if (itemIds != null && itemIds.size() > 0)
		{
			List<Item> items = itemService.getItems(itemIds);
			String strResponse = FashionetoJsonFactory.getJson(new DefaultSet<Item>(items));
			return Response.status(Status.OK).entity(strResponse).build();
		}
		return Response.status(Status.NOT_FOUND).build();
	}

}
