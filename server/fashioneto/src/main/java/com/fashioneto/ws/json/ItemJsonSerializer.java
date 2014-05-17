/**
 * 
 */
package com.fashioneto.ws.json;

import java.lang.reflect.Type;
import java.util.Set;

import com.fashioneto.persistence.Comment;
import com.fashioneto.persistence.Item;
import com.fashioneto.persistence.LikeComment;
import com.fashioneto.persistence.User;
import com.fashioneto.utils.ContextUtils;
import com.fashioneto.utils.NoUserInContextException;
import com.fashioneto.ws.entities.LikesWrapper;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;

/**
 * @author Felipe
 *
 */
public class ItemJsonSerializer implements JsonSerializer<Item> {

	public static final String JSON_PROPERTY_ID = "id";
	public static final String JSON_PROPERTY_LIKES = "likes";
	
	@Override
	public JsonElement serialize(Item item, Type typeOfSrc, JsonSerializationContext context) {
		
		JsonObject jsonObject = new JsonObject();
		
		jsonObject.addProperty(JSON_PROPERTY_ID, item.getId());
		try {
			jsonObject.add(JSON_PROPERTY_LIKES, context.serialize( getLikesWrapper(item)));
		} catch (NoUserInContextException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return jsonObject;
	}

	
	//TODO: refactor this! This is partially duplicated on CommentJsonSerializer
	private LikesWrapper getLikesWrapper(Item item) throws NoUserInContextException
	{
		Set<User> usersWhoLikedThisShittyItem = item.getLikedBy();
		User user = ContextUtils.getUserFromAuthenticationContext();
		LikesWrapper likesWrapper = new LikesWrapper(usersWhoLikedThisShittyItem.size(), usersWhoLikedThisShittyItem.contains(user));
		return likesWrapper;
	}
}
