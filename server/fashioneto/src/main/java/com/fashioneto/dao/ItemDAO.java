/**
 * 
 */
package com.fashioneto.dao;

import java.util.List;

import com.fashioneto.persistence.Item;

/**
 * @author Felipe
 *
 */
public interface ItemDAO {

	public List<Item> getItems(List<Integer> itemIds);
}
