/**
 * 
 */
package com.fashioneto.dao;

import java.util.List;

import com.fashioneto.persistence.Feed;
import com.fashioneto.persistence.User;

/**
 * @author felipe
 *
 */
public interface FeedDAO {

    public List<Feed> getFeeds(User user, int numberOfResults, int offset);
    
    
}
