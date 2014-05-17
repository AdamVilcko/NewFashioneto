/**
 * 
 */
package com.fashioneto.service;

import com.fashioneto.persistence.Item;
import com.fashioneto.persistence.User;
import com.fashioneto.ws.entities.DefaultSet;

/**
 * @author Felipe
 *
 */
public interface ItemService {

	public Item getItem(int itemId);

	public int like(User user, Item item);

	public int dislike(User user, Item item);

	public Item createItem(int itemId);
	
}
