package com.fashioneto.ws.json;

import java.lang.reflect.Type;

import com.fashioneto.persistence.Comment;
import com.fashioneto.persistence.Image;
import com.fashioneto.persistence.User;
import com.fashioneto.ws.entities.DefaultSet;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonPrimitive;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;

/**
 * @author Felipe Tonon 6 Feb 2014
 **/
public class UserJsonSerializer implements JsonSerializer<User>
{

	public static final String JSON_PROPERTY_COMMENTS = "commentsWrapper";
	public static final String JSON_PROPERTY_ITEMS = "itemsWrapper";
	public static final String JSON_PROPERTY_PHOTOS = "photosWrapper";

	public static final String JSON_PROPERTY_USER_NAME = "userName";
	public static final String JSON_PROPERTY_ID = "id";
	public static final String JSON_PROPERTY_DETAILS = "details";

	public static final String JSON_PROPERTY_DETAILS_DISPLAY_NAME = "displayName";
	public static final String JSON_PROPERTY_DETAILS_IMAGE_ID = "imageId";
	public static final String JSON_PROPERTY_DETAILS_CITY = "city";
	public static final String JSON_PROPERTY_DETAILS_COUNTRY = "country";
	public static final String JSON_PROPERTY_DETAILS_FOLLOWERS_COUNT = "followersCount";
	public static final String JSON_PROPERTY_DETAILS_FOLLOWING_COUNT = "followingCount";
	public static final String JSON_PROPERTY_DETAILS_AGE = "age";

	@Override
	public JsonElement serialize(User user, Type arg1, JsonSerializationContext context)
	{
		JsonObject jsonObject = new JsonObject();
		jsonObject.addProperty(JSON_PROPERTY_ID, user.getId());

		jsonObject.add(JSON_PROPERTY_DETAILS, getUserDetails(user));

		addWrappedSubOjects(jsonObject, user, context);

		return jsonObject;
	}

	protected void addWrappedSubOjects(JsonObject jsonObject, User user, JsonSerializationContext context)
	{
		jsonObject.add(JSON_PROPERTY_ITEMS, getItemsWrapper());

		DefaultSet<Image> imageSet = new DefaultSet<Image>(user.getImages());

		jsonObject.add(JSON_PROPERTY_PHOTOS, context.serialize(imageSet));

		//		CommentSet commentSet = new CommentSet(user.getReceivedComments());

		DefaultSet<Comment> commentSet = new DefaultSet<Comment>(user.getReceivedComments());

		jsonObject.add(JSON_PROPERTY_COMMENTS, context.serialize(commentSet));
		//		jsonObject.add(JSON_PROPERTY_COMMENTS, context.serialize(commentSet));
	}

	private JsonElement getUserDetails(User user)
	{
		JsonObject jsonObject = new JsonObject();
		jsonObject.addProperty(JSON_PROPERTY_USER_NAME, user.getUsername());
		jsonObject.addProperty(JSON_PROPERTY_DETAILS_CITY, user.getCity());
		jsonObject.addProperty(JSON_PROPERTY_DETAILS_COUNTRY, user.getCountry());
		jsonObject.addProperty(JSON_PROPERTY_DETAILS_FOLLOWERS_COUNT, 219);
		jsonObject.addProperty(JSON_PROPERTY_DETAILS_FOLLOWING_COUNT, 4596);
		jsonObject.addProperty(JSON_PROPERTY_DETAILS_AGE, -1);
		jsonObject.addProperty(JSON_PROPERTY_DETAILS_DISPLAY_NAME, user.getDisplayName());

		if (user.getProfileImage() != null)
		{
			jsonObject.addProperty(JSON_PROPERTY_DETAILS_IMAGE_ID, user.getProfileImage().getId());
		}

		return jsonObject;
	}

	private JsonElement getPhotosWrapper(User user)
	{
		JsonArray jsonArray = new JsonArray();

		for (Image image : user.getImages())
		{
			JsonPrimitive jsonId = new JsonPrimitive(image.getId());
			jsonArray.add(jsonId);
		}

		return jsonArray;
	}

	private JsonElement getItemsWrapper()
	{
		return new JsonObject();
	}

}
