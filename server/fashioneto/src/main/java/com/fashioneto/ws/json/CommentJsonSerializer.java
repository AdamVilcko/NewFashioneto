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

	public static final String JSON_PROPERTY_NAME_ID = "id";
	public static final String JSON_PROPERTY_NAME_CONTENT = "content";
	public static final String JSON_PROPERTY_NAME_COMMENTS = "comments";
	public static final String JSON_PROPERTY_NAME_USER = "senderID";

	private JsonElement getJsonFromComment(Comment comment)
	{
		JsonObject jsonObject = new JsonObject();
		jsonObject.addProperty(JSON_PROPERTY_NAME_ID, comment.getId());
		jsonObject.addProperty(JSON_PROPERTY_NAME_CONTENT, comment.getContent());
		jsonObject.addProperty(JSON_PROPERTY_NAME_USER, comment.getUser().getId());
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

		jsonObject.add(JSON_PROPERTY_NAME_COMMENTS, jsonComments);

		return jsonObject;
	}

	@Override
	public JsonElement serialize(Comment comment, Type arg1, JsonSerializationContext arg2)
	{

		return getJsonFromComment(comment);
	}

}
