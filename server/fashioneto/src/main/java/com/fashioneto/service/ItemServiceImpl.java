/**
 * 
 */
package com.fashioneto.service;

import java.util.Date;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fashioneto.dao.CommentDAO;
import com.fashioneto.dao.ItemDAO;
import com.fashioneto.persistence.Item;
import com.fashioneto.persistence.LikeItem;
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

    @Autowired
    private ItemDAO itemDAO;

    @Override
    public int like(User user, Item item) {
	LikeItem likeItem = new LikeItem(user, item);
	if (!user.getLikedItems().contains(likeItem)) {
	    user.getLikedItems().add(likeItem);
	    entityManager.merge(user);
	}
	return item.getLikes().size();
    }

    @Override
    public int dislike(User user, Item item) {
	item.removeLiker(user);
	entityManager.merge(item);
	return item.getLikes().size();
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

    @Override
    public Item retrieveItemCreateIfNull(int itemId) {
	Item item = getItem(itemId);

	if (item == null) {
	    item = createItem(itemId);
	}
	return item;
    }

    @Override
    public List<Item> getItems(List<Integer> itemIds) {
	return itemDAO.getItems(itemIds);
    }

}
