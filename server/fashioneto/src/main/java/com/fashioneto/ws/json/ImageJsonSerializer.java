package com.fashioneto.ws.json;

import java.lang.reflect.Type;
import java.util.Set;

import com.fashioneto.persistence.Comment;
import com.fashioneto.persistence.Image;
import com.fashioneto.persistence.LikeImage;
import com.fashioneto.persistence.User;
import com.fashioneto.utils.ContextUtils;
import com.fashioneto.utils.NoUserInContextException;
import com.fashioneto.ws.entities.DefaultSet;
import com.fashioneto.ws.entities.LikesWrapper;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;

/**
 * @author Felipe Tonon 22 Apr 2014
 **/
public class ImageJsonSerializer implements JsonSerializer<Image>
{
	public static final String JSON_PROPERTY_ID = "id";
	public static final String JSON_PROPERTY_LIKES = "likes";

	public static final String JSON_PROPERTY_DETAILS = "imageDetails";
	public static final String JSON_PROPERTY_DETAILS_USER_ID = "userId";
	public static final String JSON_PROPERTY_DETAILS_DESCRIPTION = "description";
	public static final String JSON_PROPERTY_COMMENTS = "commentsWrapper";

	@Override
	public JsonElement serialize(Image image, Type typeOfSrc, JsonSerializationContext context)
	{
		JsonObject jsonObject = new JsonObject();
		jsonObject.addProperty(JSON_PROPERTY_ID, image.getId());

		//		CommentSet commentSet = new CommentSet(comment.getComments());
		//		DefaultSet<Comment> commentSet = new DefaultSet<Comment>(image.getComments());
		//		jsonObject.add(JSON_PROPERTY_COMMENTS, context.serialize(commentSet));
		jsonObject.add(JSON_PROPERTY_DETAILS, getImageDetails(image));

		DefaultSet<Comment> commentSet = new DefaultSet<Comment>(image.getReceivedComments());
		jsonObject.add(JSON_PROPERTY_COMMENTS, context.serialize(commentSet));

		try
		{
			jsonObject.add(JSON_PROPERTY_LIKES, context.serialize(getLikesWrapper(image)));
		}
		catch (NoUserInContextException e)
		{
			e.printStackTrace();
		}

		return jsonObject;
	}

	private LikesWrapper getLikesWrapper(Image image) throws NoUserInContextException
	{
		Set<LikeImage> set = image.getLikes();
		User user = ContextUtils.getUserFromAuthenticationContext();
		LikesWrapper likesWrapper = new LikesWrapper(set.size(), set.contains(new LikeImage(user, image)));
		return likesWrapper;
	}

	private JsonElement getImageDetails(Image image)
	{
		JsonObject jsonObject = new JsonObject();
		jsonObject.addProperty(JSON_PROPERTY_DETAILS_USER_ID, image.getUser().getId());
		jsonObject.addProperty(JSON_PROPERTY_DETAILS_DESCRIPTION, image.getDescription());

		return jsonObject;
	}

}
