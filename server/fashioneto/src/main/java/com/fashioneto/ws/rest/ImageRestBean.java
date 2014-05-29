package com.fashioneto.ws.rest;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.fashioneto.persistence.Image;
import com.fashioneto.persistence.User;
import com.fashioneto.service.CommentService;
import com.fashioneto.service.ImageService;
import com.fashioneto.utils.ContextUtils;
import com.fashioneto.ws.entities.ImageSizeEnum;
import com.fashioneto.ws.json.FashionetoJsonFactory;
import com.sun.jersey.core.header.FormDataContentDisposition;

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
	
	@POST
	@Path("upload")
	@Consumes(MediaType.MULTIPART_FORM_DATA)
	public Response uploadFile(
			@FormParam("file") InputStream fileInputStream,
			@FormParam("file") FormDataContentDisposition contentDispositionHeader) throws IOException {

		User user = ContextUtils.getUserFromAuthenticationContext();
		
		Image image = imageService.uploadImage(user, fileInputStream, contentDispositionHeader.getFileName());

		return Response.status(200).entity(FashionetoJsonFactory.getJsonFromObject(image)).build();

	}
}
