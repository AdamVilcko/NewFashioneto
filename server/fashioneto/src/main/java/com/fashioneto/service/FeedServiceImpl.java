/**
 * 
 */
package com.fashioneto.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fashioneto.dao.FeedDAO;
import com.fashioneto.persistence.Feed;
import com.fashioneto.persistence.User;

/**
 * @author felipe
 *
 */
@Service("feedService")
public class FeedServiceImpl implements FeedService {

    @Autowired
    private FeedDAO feedDAO;

    @Override
    public List<Feed> getFeeds(User user, int numberOfResults, int offset) {
	return feedDAO.getFeeds(user, numberOfResults, offset);
    }

}
