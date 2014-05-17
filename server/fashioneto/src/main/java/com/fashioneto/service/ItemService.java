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

	public DefaultSet<Item> getItems(User user);

	public DefaultSet<Item> getItems(int userId);

	public int like(int userId, int itemId);
	
}
