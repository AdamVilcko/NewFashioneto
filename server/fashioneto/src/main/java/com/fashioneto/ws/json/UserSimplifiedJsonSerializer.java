package com.fashioneto.ws.json;

import com.fashioneto.persistence.User;
import com.google.gson.JsonObject;
import com.google.gson.JsonSerializationContext;

/**
 * @author Felipe Tonon 22 Apr 2014
 **/
public class UserSimplifiedJsonSerializer extends UserJsonSerializer
{

	@Override
	protected void addWrappedSubOjects(JsonObject jsonObject, User user, JsonSerializationContext context)
	{
		// Doesn't include sub lists
	}

}
