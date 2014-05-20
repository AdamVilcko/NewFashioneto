/**
 * 
 */
package com.fashioneto.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fashioneto.persistence.Item;

/**
 * @author Felipe
 *
 */
@Transactional
@Service("itemDAO")
public class ItemDAOImpl implements ItemDAO {

	@PersistenceContext
	private EntityManager entityManager;
	
	@Override
	public List<Item> getItems(List<Integer> itemIds) {
		TypedQuery<Item> q = entityManager.createQuery("from Item where id in (:ids)", Item.class);
		q.setParameter("ids", itemIds);
		return q.getResultList();
	}

}
