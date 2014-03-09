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
	public static final String JSON_PROPERTY_USER_NAME = "userName";

	@Override
	public JsonElement serialize(User user, Type arg1, JsonSerializationContext context)
	{
		JsonObject jsonObject = new JsonObject();
		jsonObject.addProperty(JSON_PROPERTY_USER_NAME, user.getUsername());

		jsonObject.add(JSON_PROPERTY_COMMENTS, context.serialize(user.getReceivedCommentsCommentSet()));

		return jsonObject;
	}

}
