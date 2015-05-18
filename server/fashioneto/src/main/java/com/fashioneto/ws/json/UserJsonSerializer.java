package com.fashioneto.ws.json;

import java.lang.reflect.Type;

import com.fashioneto.persistence.Comment;
import com.fashioneto.persistence.Image;
import com.fashioneto.persistence.LikeItem;
import com.fashioneto.persistence.User;
import com.fashioneto.persistence.UserStatus;
import com.fashioneto.utils.ContextUtils;
import com.fashioneto.utils.NoUserInContextException;
import com.fashioneto.ws.entities.DefaultSet;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;

/**
 * @author Felipe Tonon 6 Feb 2014
 **/
public class UserJsonSerializer implements JsonSerializer<User> {

    public static final String JSON_PROPERTY_COMMENTS = "commentsWrapper";
    public static final String JSON_PROPERTY_ITEMS = "itemsWrapper";
    public static final String JSON_PROPERTY_IMAGES = "imagesWrapper";
    public static final String JSON_PROPERTY_FOLLOWERS = "followersWrapper";
    public static final String JSON_PROPERTY_FOLLOWING = "followingWrapper";

    public static final String JSON_PROPERTY_USER_NAME = "userName";
    public static final String JSON_PROPERTY_ID = "id";
    public static final String JSON_PROPERTY_DETAILS = "details";
    public static final String JSON_PROPERTY_FOLLOWED = "isFollowed";

    public static final String JSON_PROPERTY_DETAILS_DISPLAY_NAME = "displayName";
    public static final String JSON_PROPERTY_DETAILS_IMAGE_ID = "imageId";
    public static final String JSON_PROPERTY_DETAILS_CITY = "city";
    public static final String JSON_PROPERTY_DETAILS_COUNTRY = "country";
    public static final String JSON_PROPERTY_DETAILS_FOLLOWERS_COUNT = "followersCount";
    public static final String JSON_PROPERTY_DETAILS_FOLLOWING_COUNT = "followingCount";
    public static final String JSON_PROPERTY_DETAILS_AGE = "age";
    public static final String JSON_PROPERTY_DETAILS_EMAIL = "email";
    public static final String JSON_PROPERTY_DETAILS_STATUS = "status";
    public static final String JSON_PROPERTY_DETAILS_PROFILE_IMAGE_ID = "profileImageId";

    @Override
    public JsonElement serialize(User user, Type arg1, JsonSerializationContext context) {
	JsonObject jsonObject = new JsonObject();
	jsonObject.addProperty(JSON_PROPERTY_ID, user.getId());

	if (user.getStatus() != UserStatus.INVITED) {
		try {
		    jsonObject.addProperty(JSON_PROPERTY_FOLLOWED, ContextUtils.isFollowed(user));
		} catch (NoUserInContextException e) {
		    e.printStackTrace();
		}
	}

	jsonObject.add(JSON_PROPERTY_DETAILS, getUserDetails(user));

	addWrappedSubOjects(jsonObject, user, context);

	return jsonObject;
    }

    protected void addWrappedSubOjects(JsonObject jsonObject, User user, JsonSerializationContext context) {
	DefaultSet<Image> imageSet = new DefaultSet<Image>(user.getImages());
	jsonObject.add(JSON_PROPERTY_IMAGES, context.serialize(imageSet));

	DefaultSet<Comment> commentSet = new DefaultSet<Comment>(user.getReceivedComments());
	jsonObject.add(JSON_PROPERTY_COMMENTS, context.serialize(commentSet));

	DefaultSet<LikeItem> likedItems = new DefaultSet<LikeItem>(user.getLikedItems());
	jsonObject.add(JSON_PROPERTY_ITEMS, context.serialize(likedItems));

	DefaultSet<User> followersSet = new DefaultSet<User>(user.getFollowers());
	jsonObject.add(JSON_PROPERTY_FOLLOWERS, FashionetoJsonFactory.getJsonElement(followersSet));

	DefaultSet<User> followingSet = new DefaultSet<User>(user.getFollowing());
	jsonObject.add(JSON_PROPERTY_FOLLOWING, FashionetoJsonFactory.getJsonElement(followingSet));

    }

    private JsonElement getUserDetails(User user) {
	JsonObject jsonObject = new JsonObject();
	jsonObject.addProperty(JSON_PROPERTY_USER_NAME, user.getUsername());
	jsonObject.addProperty(JSON_PROPERTY_DETAILS_CITY, user.getCity());
	jsonObject.addProperty(JSON_PROPERTY_DETAILS_COUNTRY, user.getCountry());
	jsonObject.addProperty(JSON_PROPERTY_DETAILS_FOLLOWERS_COUNT, user.getFollowers().size());
	jsonObject.addProperty(JSON_PROPERTY_DETAILS_FOLLOWING_COUNT, user.getFollowing().size());
	jsonObject.addProperty(JSON_PROPERTY_DETAILS_AGE, -1);
	jsonObject.addProperty(JSON_PROPERTY_DETAILS_DISPLAY_NAME, user.getDisplayName());
	jsonObject.addProperty(JSON_PROPERTY_DETAILS_EMAIL, user.getEmail());
	jsonObject.addProperty(JSON_PROPERTY_DETAILS_DISPLAY_NAME, user.getDisplayName());
	jsonObject.addProperty(JSON_PROPERTY_DETAILS_STATUS, user.getStatus().name());
	
	if (user.getProfileImage() != null) {
	    jsonObject.addProperty(JSON_PROPERTY_DETAILS_PROFILE_IMAGE_ID, user.getProfileImage().getId());
	}
	
	
	if (user.getProfileImage() != null) {
	    jsonObject.addProperty(JSON_PROPERTY_DETAILS_IMAGE_ID, user.getProfileImage().getId());
	}

	return jsonObject;
    }

}
