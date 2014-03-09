package com.fashioneto.ws.json;

import java.lang.reflect.Type;

import com.fashioneto.persistence.Comment;
import com.fashioneto.persistence.CommentSet;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;

/**
 * @author Felipe Tonon 9 Mar 2014
 **/

public class CommentSetJsonSerializer implements JsonSerializer<CommentSet>
{

	private static final String JSON_PROPERTY_COLLECTION_COUNT = "count";
	private static final String JSON_PROPERTY_COLLECTION_CONTENT = "collection";

	@Override
	public JsonElement serialize(CommentSet comments, Type typeOfSrc, JsonSerializationContext context)
	{

		JsonArray jsonComments = new JsonArray();

		for (Comment comment : comments)
		{
			jsonComments.add(context.serialize(comment));
		}

		JsonObject jsonCollectionWrapper = new JsonObject();
		jsonCollectionWrapper.addProperty(JSON_PROPERTY_COLLECTION_COUNT, comments.size());
		jsonCollectionWrapper.add(JSON_PROPERTY_COLLECTION_CONTENT, jsonComments);

		return jsonCollectionWrapper;
	}

}
