package com.fashioneto.ws.rest;

import java.io.IOException;
import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.fashioneto.persistence.Image;
import com.fashioneto.service.ImageService;
import com.fashioneto.ws.json.FashionetoJsonFactory;

/**
 * @author Felipe
 */
@Component
@Path("/images")
public class ImagesRestBean
{

	@Autowired
	private ImageService imageService;

	@GET
	@Path("user/{userId}")
	public Response getImageList(@PathParam("userId")
	int userId) throws IOException
	{
		List<Image> imageIds = imageService.getImages(userId);
		return Response.status(Status.OK).entity(FashionetoJsonFactory.getJsonFromObject(imageIds)).build();
	}
}

