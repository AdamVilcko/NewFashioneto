package com.fashioneto.ws.rest;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
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
import com.fashioneto.service.ImageService;
import com.fashioneto.utils.ContextUtils;
import com.fashioneto.utils.NoUserInContextException;
import com.fashioneto.ws.entities.ImageSize;
import com.fashioneto.ws.entities.LikesWrapper;
import com.fashioneto.ws.json.FashionetoJsonFactory;
import com.sun.jersey.core.header.FormDataContentDisposition;
import com.sun.jersey.multipart.FormDataBodyPart;
import com.sun.jersey.multipart.FormDataParam;

/**
 * @author Felipe
 */
@Component
@Path("/image")
public class ImageRestBean
{
	@Autowired
	private ImageService imageService;

	@GET
	@Path("raw/{imageId}")
	public Response getImageStandardSize(@PathParam("imageId")
	int imageId) throws IOException
	{
		return getResponseImageContent(imageId, ImageSize.STANDARD);
	}

	@GET
	@Path("raw/{imageSize}/{imageId}")
	public Response getImageStandardSize(@PathParam("imageSize")
	ImageSize imageSize, @PathParam("imageId")
	int imageId) throws IOException
	{
		return getResponseImageContent(imageId, imageSize);
	}

	private Response getResponseImageContent(int imageId, ImageSize imageSize) throws IOException
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
	public Response uploadFile(@FormDataParam("file")
	InputStream fileInputStream, @FormDataParam("file")
	FormDataContentDisposition contentDispositionHeader, @FormDataParam("file")
	FormDataBodyPart body) throws IOException
	{
		try
		{
			User user = ContextUtils.getUserFromAuthenticationContext();
			Image image = imageService.uploadImage(user, fileInputStream, body.getMediaType().getSubtype());
			return Response.ok().entity(FashionetoJsonFactory.getJsonFromObject(image)).build();
		}
		catch (NoUserInContextException e)
		{
			e.printStackTrace();
			return Response.status(Status.FORBIDDEN).build();
		}

	}

	@POST
	@Path("like/{imageId}")
	public Response likeComment(@PathParam("imageId")
	int imageId) throws NoUserInContextException
	{
		if (imageId < 1)
		{
			return Response.status(Status.NOT_ACCEPTABLE).build();
		}

		Image image = imageService.getImage(imageId);

		if (image == null)
		{
			return Response.status(Status.NOT_ACCEPTABLE).build();
		}
		return like(image, true);
	}

	@DELETE
	@Path("like/{imageId}")
	public Response dislikeComment(@PathParam("imageId")
	int imageId) throws NoUserInContextException
	{
		Image image = imageService.getImage(imageId);
		return like(image, false);
	}

	// DUPLICATED FOR ITEMS!! REfactor this shit, you lazy bastard!!
	private Response like(Image image, boolean isAdding) throws NoUserInContextException
	{
		// http://localhost:8080/Fashioneto/as/item/like/443831786

		if (image != null)
		{
			User user = ContextUtils.getUserFromAuthenticationContext();

			int likesCount;
			if (isAdding)
			{
				likesCount = imageService.like(user, image);
			}
			else
			{
				likesCount = imageService.dislike(user, image);
			}

			LikesWrapper likesWrapper = new LikesWrapper(likesCount, isAdding);
			return Response.status(Status.OK).entity(FashionetoJsonFactory.getJsonFromObject(likesWrapper)).build();
		}

		return Response.status(Status.NOT_FOUND).build();
	}

}
