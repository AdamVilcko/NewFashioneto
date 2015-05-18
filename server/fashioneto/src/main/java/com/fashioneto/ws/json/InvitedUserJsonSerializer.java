package com.fashioneto.ws.json;

import java.lang.reflect.Type;

import com.fashioneto.persistence.User;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;

public class InvitedUserJsonSerializer implements JsonSerializer<User>{

    public static final String JSON_PROPERTY_ID = "id";
    public static final String JSON_PROPERTY_DETAILS_EMAIL = "email";
	
	@Override
	public JsonElement serialize(User user, Type arg1,
			JsonSerializationContext context) {
		JsonObject jsonObject = new JsonObject();
		jsonObject.addProperty(JSON_PROPERTY_ID, user.getId());
		jsonObject.addProperty(JSON_PROPERTY_DETAILS_EMAIL, user.getEmail());

		return jsonObject;
	}

}
