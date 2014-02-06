package com.fashioneto.ws.json;

import java.lang.reflect.Type;

import com.fashioneto.persistence.Comment;
import com.fashioneto.persistence.User;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;

/**
 * @author Felipe Tonon 6 Feb 2014
 **/
public class UserJsonSerializer implements JsonSerializer<User>
{

	@Override
	public JsonElement serialize(User user, Type arg1, JsonSerializationContext context)
	{
		JsonObject jsonObject = new JsonObject();
		jsonObject.addProperty("username", user.getUsername());

		JsonArray jsonComments = new JsonArray();
		for (Comment comment : user.getReceivedComments())
		{
			jsonComments.add(CommentJsonSerializer.getJsonFromComment(comment));
		}

		jsonObject.add("comments", jsonComments);

		//		jsonObject.addProperty("numberOfDirectCommentsReceived", user.getReceivedComments().size());
		//		jsonObject.addProperty("numberOfDirectCommentsPosted", user.getPostedComments().size());
		return jsonObject;
	}

}
