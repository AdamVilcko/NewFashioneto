/**
 * 
 */
package com.fashioneto.ws.json;

import java.lang.reflect.Type;

import com.fashioneto.persistence.Feed;
import com.fashioneto.persistence.FeedType;
import com.fashioneto.utils.DateUtils;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;

/**
 * @author felipe
 *
 */
public class FeedJsonSerializer implements JsonSerializer<Feed> {

    public static final String JSON_PROPERTY_USER = "user";
    public static final String JSON_PROPERTY_TYPE = "feedType";
    public static final String JSON_PROPERTY_DATE = "date";
    public static final String JSON_PROPERTY_ITEM = "feedItem";
    public static final String JSON_PROPERTY_ID = "feedId";

    @Override
    public JsonElement serialize(Feed feed, Type typeOfSrc, JsonSerializationContext context) {
	JsonObject jsonObject = new JsonObject();
	jsonObject.addProperty(JSON_PROPERTY_ID, feed.getId());
	jsonObject.addProperty(JSON_PROPERTY_TYPE, feed.getType().name());
	jsonObject.addProperty(JSON_PROPERTY_DATE, DateUtils.getDateInTimestampString(feed.getDate()));
	jsonObject.add(JSON_PROPERTY_USER, FashionetoJsonFactory.getSimplifiedJson(feed.getUser()));

	switch (feed.getType()) {
	case LIKE_ITEM:
	    jsonObject.add(JSON_PROPERTY_ITEM, context.serialize(feed.getLikeItem()));
	    break;

	default:
	    break;
	}

	return jsonObject;
    }

}
