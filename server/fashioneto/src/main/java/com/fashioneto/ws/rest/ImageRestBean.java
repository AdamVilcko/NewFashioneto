package com.fashioneto.ws.rest;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.fashioneto.service.CommentService;
import com.fashioneto.service.ImageService;
import com.fashioneto.ws.entities.ImageSizeEnum;
import com.fashioneto.ws.json.FashionetoJsonFactory;

/**
 * @author Felipe
 */
@Component
@Path("/image")
public class ImageRestBean
{

	@Autowired
	protected CommentService commentService;
	@Autowired
	private ImageService imageService;

	@GET
	@Path("s/{userId}")
	public Response getImageList(@PathParam("userId")
	int userId) throws IOException
	{
		List<Integer> imageIds = imageService.getImageIds(userId);
		return Response.status(Status.OK).entity(FashionetoJsonFactory.getJsonFromObject(imageIds)).build();
	}

	@GET
	@Path("{imageId}")
	public Response getImageStandardSize(@PathParam("imageId")
	int imageId) throws IOException
	{
		return getResponseImageContent(imageId, ImageSizeEnum.STANDARD);
	}

	@GET
	@Path("{imageSize}/{imageId}")
	public Response getImageStandardSize(@PathParam("imageSize")
	ImageSizeEnum imageSize, @PathParam("imageId")
	int imageId) throws IOException
	{
		return getResponseImageContent(imageId, imageSize);
	}

	private Response getResponseImageContent(int imageId, ImageSizeEnum imageSize) throws IOException
	{
		ByteArrayOutputStream baos = imageService.getImageContent(imageId, imageSize);
		if (baos != null)
		{
			byte[] imageData = baos.toByteArray();
			return Response.ok(imageData).type(new MediaType("image", MediaType.WILDCARD)).build();
		}
		return Response.status(Status.NOT_FOUND).build();
	}
}
