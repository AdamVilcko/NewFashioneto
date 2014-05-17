/**
 * 
 */
package com.fashioneto.service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fashioneto.dao.UserDAO;
import com.fashioneto.persistence.Item;
import com.fashioneto.persistence.User;
import com.fashioneto.ws.entities.DefaultSet;

/**
 * @author Felipe
 *
 */
@Service("itemService")
public class ItemServiceImpl implements ItemService {

	@PersistenceContext
	private EntityManager entityManager;
	
	@Override
	public DefaultSet<Item> getItems(int userId) {
		User user = entityManager.find(User.class, userId);
		return getItems(user);
	}	
	
	@Override
	public DefaultSet<Item> getItems(User user) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int like(int userId, int itemId) {
		// TODO Auto-generated method stub
		return 0;
	}
	
	
}
