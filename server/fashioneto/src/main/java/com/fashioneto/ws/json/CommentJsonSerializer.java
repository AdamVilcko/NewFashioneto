package com.fashioneto.ws.json;

import java.lang.reflect.Type;
import java.util.Set;

import com.fashioneto.persistence.Comment;
import com.fashioneto.persistence.LikeComment;
import com.fashioneto.persistence.User;
import com.fashioneto.utils.ContextUtils;
import com.fashioneto.utils.NoUserInContextException;
import com.fashioneto.ws.entities.LikesWrapper;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;

/**
 * @author Felipe Tonon 6 Feb 2014
 **/
public class CommentJsonSerializer implements JsonSerializer<Comment>
{

	public static final String JSON_PROPERTY_ID = "id";
	public static final String JSON_PROPERTY_CONTENT = "content";
	public static final String JSON_PROPERTY_COMMENTS = "commentsWrapper";
	public static final String JSON_PROPERTY_USER_ID = "userId";
	public static final String JSON_PROPERTY_DISPLAY_NAME = "displayName";
	public static final String JSON_PROPERTY_IMAGE_ID = "imageId";
	public static final String JSON_PROPERTY_LIKES = "likes";
	public static final String JSON_PROPERTY_DATE = "date";
	public static final String JSON_PROPERTY_STATUS = "status";

	private JsonElement getJsonFromComment(Comment comment, JsonSerializationContext context)
			throws NoUserInContextException
	{
		JsonObject jsonObject = new JsonObject();
		jsonObject.addProperty(JSON_PROPERTY_ID, comment.getId());
		jsonObject.addProperty(JSON_PROPERTY_CONTENT, comment.getContent());
		jsonObject.addProperty(JSON_PROPERTY_USER_ID, comment.getUser().getId());
		jsonObject.addProperty(JSON_PROPERTY_DISPLAY_NAME, comment.getUser().getDisplayName());
		jsonObject.addProperty(JSON_PROPERTY_DATE, comment.getDateInTimestampString());
		jsonObject.addProperty(JSON_PROPERTY_STATUS, comment.getStatus().toString());

		if (comment.getUser().getProfileImage() != null)
		{
			jsonObject.addProperty(JSON_PROPERTY_IMAGE_ID, comment.getUser().getProfileImage().getId());
		}

		jsonObject.add(JSON_PROPERTY_COMMENTS, context.serialize(comment.getCommentsCommentSet()));
		jsonObject.add(JSON_PROPERTY_LIKES, context.serialize(getLikesWrapper(comment)));

		return jsonObject;
	}

	private LikesWrapper getLikesWrapper(Comment comment) throws NoUserInContextException
	{
		Set<LikeComment> set = comment.getLikes();
		User user = ContextUtils.getUserFromAuthenticationContext();
		LikesWrapper likesWrapper = new LikesWrapper(set.size(), set.contains(new LikeComment(user, comment)));
		return likesWrapper;
	}

	@Override
	public JsonElement serialize(Comment comment, Type arg1, JsonSerializationContext context)
	{
		JsonElement jsonElement = null;
		try
		{
			jsonElement = getJsonFromComment(comment, context);
		}
		catch (NoUserInContextException e)
		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return jsonElement;
	}

}
