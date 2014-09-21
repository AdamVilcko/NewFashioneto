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

import com.fashioneto.persistence.Feed;
import com.fashioneto.persistence.User;

/**
 * @author felipe
 *
 */
@Transactional
@Service("feedDAO")
public class FeedDAOImpl implements FeedDAO {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<Feed> getFeeds(User user, int numberOfResults, int offset) {

	TypedQuery<Feed> query = entityManager.createQuery("from Feed where user IN :users ", Feed.class);
	query.setParameter("users", user.getFollowing());
	return query.setMaxResults(numberOfResults).setFirstResult(offset).getResultList();
    }

}
