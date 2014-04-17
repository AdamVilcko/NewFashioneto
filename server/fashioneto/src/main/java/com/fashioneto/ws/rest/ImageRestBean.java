/**
 * 
 */
package com.fashioneto.ws.rest;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.fashioneto.service.CommentService;
import com.fashioneto.service.ImageService;
import com.fashioneto.ws.entities.ImageSizeEnum;

/**
 * @author felipe
 */
@Path("/image")
@Component
public class ImageRestBean
{

	@Autowired
	protected CommentService commentService;
	@Autowired
	private ImageService imageService;

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
		byte[] imageData = baos.toByteArray();
		return Response.ok(imageData).type(new MediaType("image", MediaType.WILDCARD)).build();
	}
}
