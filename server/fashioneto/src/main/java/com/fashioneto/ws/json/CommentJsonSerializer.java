package com.fashioneto.ws.json;

import java.lang.reflect.Type;

import com.fashioneto.persistence.Comment;
import com.google.gson.JsonArray;
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
	public static final String JSON_PROPERTY_USER_NAME = "userName";
	public static final String JSON_PROPERTY_LIKES = "likes";

	public static final String JSON_PROPERTY_COLLECTION_COUNT = "count";
	public static final String JSON_PROPERTY_COLLECTION_CONTENT = "collection";

	private JsonElement getJsonFromComment(Comment comment)
	{
		JsonObject jsonObject = new JsonObject();
		jsonObject.addProperty(JSON_PROPERTY_ID, comment.getId());
		jsonObject.addProperty(JSON_PROPERTY_CONTENT, comment.getContent());
		jsonObject.addProperty(JSON_PROPERTY_USER_ID, comment.getUser().getId());
		jsonObject.addProperty(JSON_PROPERTY_USER_NAME, comment.getUser().getUsername());
		jsonObject.addProperty(JSON_PROPERTY_LIKES, 0);

		JsonArray jsonComments = new JsonArray();
		for (Comment subComment : comment.getComments())
		{
			if (subComment.getId() == comment.getId())
			{
				System.out.println("Mapping error! A comment shouldn't be it's own parent. Id = " + comment.getId());
			}
			else
			{
				jsonComments.add(getJsonFromComment(subComment));

			}
		}

		JsonObject jsonCollectionWrapper = new JsonObject();
		jsonCollectionWrapper.addProperty(JSON_PROPERTY_COLLECTION_COUNT, comment.getComments().size());
		jsonCollectionWrapper.add(JSON_PROPERTY_COLLECTION_CONTENT, jsonComments);

		jsonObject.add(JSON_PROPERTY_COMMENTS, jsonCollectionWrapper);

		return jsonObject;
	}

	@Override
	public JsonElement serialize(Comment comment, Type arg1, JsonSerializationContext arg2)
	{

		return getJsonFromComment(comment);
	}

}
