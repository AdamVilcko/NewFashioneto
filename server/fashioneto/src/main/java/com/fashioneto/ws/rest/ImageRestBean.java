package com.fashioneto.ws.rest;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.net.URLDecoder;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.fashioneto.persistence.Album;
import com.fashioneto.persistence.Image;
import com.fashioneto.persistence.User;
import com.fashioneto.service.AlbumService;
import com.fashioneto.service.ImageService;
import com.fashioneto.utils.ContextUtils;
import com.fashioneto.utils.NoUserInContextException;
import com.fashioneto.ws.entities.ImageSize;
import com.fashioneto.ws.entities.LikesWrapper;
import com.fashioneto.ws.json.FashionetoJsonFactory;
import com.google.appengine.tools.cloudstorage.GcsService;
import com.google.appengine.tools.cloudstorage.GcsServiceFactory;
import com.google.appengine.tools.cloudstorage.RetryParams;


/**
 * @author Felipe
 */
@Component
@Path("/image")
public class ImageRestBean {
	@Autowired
	private ImageService imageService;
	@Autowired
	private AlbumService albumService;
	
   @PersistenceContext
    private EntityManager entityManager;
	
	private final GcsService gcsService =
		    GcsServiceFactory.createGcsService(RetryParams.getDefaultInstance());

	@GET
	@Path("raw/{imageId}")
	public Response getImageStandardSize(@PathParam("imageId") int imageId)
			throws IOException {
		return getResponseImageContent(imageId, ImageSize.STANDARD);
	}

	@GET
	@Path("raw/{imageSize}/{imageId}")
	public Response getImageStandardSize(
			@PathParam("imageSize") ImageSize imageSize,
			@PathParam("imageId") int imageId) throws IOException {
		return getResponseImageContent(imageId, imageSize);
	}

	private Response getResponseImageContent(int imageId, ImageSize imageSize)
			throws IOException {
		ByteArrayOutputStream baos = imageService.getImageContent(imageId,
				imageSize);
		if (baos != null) {
			byte[] imageData = baos.toByteArray();
			return Response.ok(imageData)
					.type(new MediaType("image", MediaType.WILDCARD)).build();
		}
		return Response.status(Status.NOT_FOUND).build();
	}

	@POST
	@Path("upload")
	@Consumes(MediaType.MULTIPART_FORM_DATA)
	public Response uploadFile(@FormDataParam("file") InputStream uploadedInputStream,
		    @FormDataParam("file") FormDataContentDisposition fileDetail) throws IOException {

		if (uploadedInputStream == null) {
			return Response.status(Status.BAD_REQUEST).build();
		}
		try {
			User user = ContextUtils.getUserFromAuthenticationContext();
			Album album = albumService.getUploadAlbum(user);
			Image image = imageService.uploadImage(user, uploadedInputStream, "jpg", album);
			return Response.ok()
					.entity(FashionetoJsonFactory.getJsonFromObject(image))
					.build();
		} catch (NoUserInContextException e) {
			e.printStackTrace();
			return Response.status(Status.FORBIDDEN).build();
		}

	}

	@POST
	@Path("uploadFromCrop")
	public Response uploadFromCrop(String imageData)
			throws NoUserInContextException {

		try {

			InputStream imageStream = getFromBase64(imageData);
			User user = ContextUtils.getUserFromAuthenticationContext();
			Album album = albumService.getUploadAlbum(user);
			Image image = imageService.uploadImage(user, imageStream, "jpg",
						album);
			if (user.getProfileImage() == null) {
				imageService.uploadProfilePicture(user, image);
			}	
			return Response.ok()
					.entity(FashionetoJsonFactory.getJsonFromObject(image))
					.build();
		} catch (IOException e) {
			e.printStackTrace();
			return Response.status(Status.FORBIDDEN).build();

		}

	}
	
	private InputStream getFromBase64(String imageData) throws IOException, NoUserInContextException {
		String decodedImageData = URLDecoder.decode(imageData, "UTF-8");
		String imageDataBytes = decodedImageData.substring(decodedImageData.indexOf(",")+1, decodedImageData.length()-2);
		System.out.println(imageDataBytes);
		

		byte[] decodedBytes = com.google.api.client.util.Base64.decodeBase64(imageDataBytes);
		
		InputStream inputStream = new ByteArrayInputStream(decodedBytes);

		return inputStream;

	}
	
	@POST
	@Path("uploadFromUrl")
	public Response uploadFromUrl(String imageURL)
			throws NoUserInContextException {

		try {
				InputStream inputStream = new URL(URLDecoder.decode(imageURL, "UTF-8")).openStream();
				User user = ContextUtils.getUserFromAuthenticationContext();
				Album album = albumService.getUploadAlbum(user);
				Image image = imageService.uploadImage(user, inputStream, "jpg",
						album);
				if (user.getProfileImage() == null) {
					imageService.uploadProfilePicture(user, image);
				}
			return Response.ok()
					.entity(FashionetoJsonFactory.getJsonFromObject(image))
					.build();
		} catch (IOException e) {
			e.printStackTrace();
			return Response.status(Status.FORBIDDEN).build();

		}

	}

	@POST
	@Path("upload/{albumId}")
	@Consumes(MediaType.MULTIPART_FORM_DATA)
	public Response uploadFile(
			@PathParam("album") int albumId,
			@FormDataParam("file") InputStream uploadedInputStream,
		    @FormDataParam("file") FormDataContentDisposition fileDetail) throws IOException {

		if (uploadedInputStream == null) {
			return Response.status(Status.BAD_REQUEST).build();
		}
		try {
			User user = ContextUtils.getUserFromAuthenticationContext();
			Album album = albumService.getAlbum(albumId);
			Image image = imageService.uploadImage(user, uploadedInputStream, "jpg", album);
			return Response.ok()
					.entity(FashionetoJsonFactory.getJsonFromObject(image))
					.build();
		} catch (NoUserInContextException e) {
			e.printStackTrace();
			return Response.status(Status.FORBIDDEN).build();
		}

	}

	@POST
	@Path("upload/profile")
	public Response uploadProfilePicture(String imageData) throws IOException {


		try {
			InputStream imageStream = getFromBase64(imageData);
			User user = ContextUtils.getUserFromAuthenticationContext();
			Album album = albumService.getProfileAlbum(user);
			Image image = imageService.uploadImage(user, imageStream, "jpg",
						album);
			imageService.uploadProfilePicture(user, image);
			return Response.ok()
					.entity(FashionetoJsonFactory.getJsonFromObject(image))
					.build();
		} catch (NoUserInContextException e) {
			e.printStackTrace();
			return Response.status(Status.FORBIDDEN).build();
		}

	}

	@POST
	@Path("like/{imageId}")
	public Response likeComment(@PathParam("imageId") int imageId)
			throws NoUserInContextException {
		if (imageId < 1) {
			return Response.status(Status.NOT_ACCEPTABLE).build();
		}

		Image image = imageService.getImage(imageId);

		if (image == null) {
			return Response.status(Status.NOT_ACCEPTABLE).build();
		}
		return like(image, true);
	}

	@DELETE
	@Path("like/{imageId}")
	public Response dislikeComment(@PathParam("imageId") int imageId)
			throws NoUserInContextException {
		Image image = imageService.getImage(imageId);
		return like(image, false);
	}

	// DUPLICATED FOR ITEMS!! REfactor this shit, you lazy bastard!!
	private Response like(Image image, boolean isAdding)
			throws NoUserInContextException {
		// http://localhost:8080/Fashioneto/as/item/like/443831786

		if (image != null) {
			User user = ContextUtils.getUserFromAuthenticationContext();

			int likesCount;
			if (isAdding) {
				likesCount = imageService.like(user, image);
			} else {
				likesCount = imageService.dislike(user, image);
			}

			LikesWrapper likesWrapper = new LikesWrapper(likesCount, isAdding);
			return Response
					.status(Status.OK)
					.entity(FashionetoJsonFactory
							.getJsonFromObject(likesWrapper)).build();
		}

		return Response.status(Status.NOT_FOUND).build();
	}

}
