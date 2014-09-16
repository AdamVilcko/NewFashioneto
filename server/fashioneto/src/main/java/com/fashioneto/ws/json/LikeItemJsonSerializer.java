/**
 * 
 */
package com.fashioneto.ws.json;

import java.lang.reflect.Type;

import com.fashioneto.persistence.LikeItem;
import com.google.gson.JsonElement;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;

/**
 * @author Felipe
 */
public class LikeItemJsonSerializer implements JsonSerializer<LikeItem> {

    @Override
    public JsonElement serialize(LikeItem likeItem, Type typeOfSrc, JsonSerializationContext context) {
	return  context.serialize(likeItem.getItem());
    }

}