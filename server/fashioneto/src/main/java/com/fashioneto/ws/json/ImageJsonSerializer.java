package com.fashioneto.ws.json;

import java.lang.reflect.Type;

import com.fashioneto.persistence.Image;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;

/**
 * @author Felipe Tonon 22 Apr 2014
 **/
public class ImageJsonSerializer implements JsonSerializer<Image>
{
	public static final String JSON_PROPERTY_ID = "id";

	@Override
	public JsonElement serialize(Image image, Type typeOfSrc, JsonSerializationContext context)
	{
		JsonObject jsonObject = new JsonObject();
		jsonObject.addProperty(JSON_PROPERTY_ID, image.getId());
		return jsonObject;
	}

}
