/**
 * 
 */
package com.fashioneto.service;

import java.util.Date;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fashioneto.persistence.Item;
import com.fashioneto.persistence.User;

/**
 * @author Felipe
 *
 */
@Service("itemService")
@Transactional
public class ItemServiceImpl implements ItemService {

	@PersistenceContext
	private EntityManager entityManager;
	
	
	@Override
	public int like(User user, Item item) {
		item.addLiker(user);
		entityManager.merge(item);
		return item.getLikedBy().size();
	}

	@Override
	public int dislike(User user, Item item) {
		item.removeLiker(user);
		entityManager.merge(item);
		return item.getLikedBy().size();
	}

	@Override
	public Item getItem(int itemId) {
		return entityManager.find(Item.class, itemId);
	}

	@Override
	public Item createItem(int itemId) {
		Item item = new Item(itemId, new Date());
		return entityManager.merge(item);
	}
	
	
}
