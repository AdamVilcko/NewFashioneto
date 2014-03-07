package com.fashioneto.ws.json;

import static com.fashioneto.ws.json.CommentJsonSerializer.JSON_PROPERTY_COLLECTION_CONTENT;
import static com.fashioneto.ws.json.CommentJsonSerializer.JSON_PROPERTY_COLLECTION_COUNT;
import static com.fashioneto.ws.json.CommentJsonSerializer.JSON_PROPERTY_COMMENTS;

import java.lang.reflect.Type;
import java.util.Set;

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
		Set<Comment> comments = user.getReceivedComments();
		for (Comment comment : comments)
		{
			jsonComments.add(context.serialize(comment));
		}

		JsonObject jsonCollectionWrapper = new JsonObject();
		jsonCollectionWrapper.addProperty(JSON_PROPERTY_COLLECTION_COUNT, comments.size());
		jsonCollectionWrapper.add(JSON_PROPERTY_COLLECTION_CONTENT, jsonComments);

		jsonObject.add(JSON_PROPERTY_COMMENTS, jsonCollectionWrapper);

		return jsonObject;
	}

}
