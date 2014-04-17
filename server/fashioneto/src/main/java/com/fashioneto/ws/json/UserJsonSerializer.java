package com.fashioneto.ws.json;

import java.lang.reflect.Type;

import com.fashioneto.persistence.User;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
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
		jsonObject.add(JSON_PROPERTY_ITEMS, getItemsWrapper());
		jsonObject.add(JSON_PROPERTY_PHOTOS, getPhotosWrapper());

		jsonObject.add(JSON_PROPERTY_COMMENTS, context.serialize(user.getReceivedCommentsCommentSet()));

		return jsonObject;
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

	private JsonElement getPhotosWrapper()
	{
		return new JsonObject();
	}

	private JsonElement getItemsWrapper()
	{
		return new JsonObject();
	}

}
