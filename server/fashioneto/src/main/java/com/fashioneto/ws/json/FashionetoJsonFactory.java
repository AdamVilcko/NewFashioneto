package com.fashioneto.ws.json;

import com.fashioneto.persistence.Comment;
import com.fashioneto.persistence.User;
import com.fashioneto.ws.entities.ResponseWrapper;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

/**
 * @author Felipe Tonon 6 Feb 2014
 **/
public class FashionetoJsonFactory
{

	private static GsonBuilder getGsonBuilder()
	{
		GsonBuilder gBuilder = new GsonBuilder();
		gBuilder.registerTypeAdapter(Comment.class, new CommentJsonSerializer());
		gBuilder.registerTypeAdapter(User.class, new UserJsonSerializer());
		return gBuilder;
	}

	private static Gson getGson()
	{
		//		return getGsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
		return getGsonBuilder().setPrettyPrinting().create();
	}

	public static String getJson(User user)
	{
		Gson gson = getGson();
		return gson.toJson(user);
	}

	public static String getJson(ResponseWrapper rw)
	{
		Gson gson = getGson();
		return gson.toJson(rw);
	}
}
