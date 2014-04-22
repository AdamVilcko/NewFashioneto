package com.fashioneto.ws.json;

import java.lang.reflect.Type;

import com.fashioneto.ws.entities.DefaultSet;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;

/**
 * @author Felipe Tonon 9 Mar 2014
 **/

public class DefaultSetJsonSerializer<T> implements JsonSerializer<T>
{

	public static final String JSON_PROPERTY_COLLECTION_COUNT = "count";
	public static final String JSON_PROPERTY_COLLECTION_CONTENT = "collection";

	@Override
	public JsonElement serialize(T src, Type typeOfSrc, JsonSerializationContext context)
	{
		if (src instanceof DefaultSet<?>)
		{
			DefaultSet<T> items = (DefaultSet<T>) src;
			JsonArray jsonComments = new JsonArray();

			for (T item : items)
			{
				jsonComments.add(context.serialize(item));
			}

			JsonObject jsonCollectionWrapper = new JsonObject();
			jsonCollectionWrapper.addProperty(JSON_PROPERTY_COLLECTION_COUNT, items.size());
			jsonCollectionWrapper.add(JSON_PROPERTY_COLLECTION_CONTENT, jsonComments);

			return jsonCollectionWrapper;
		}

		return null;
	}
}
