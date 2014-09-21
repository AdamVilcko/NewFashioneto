/**
 * 
 */
package com.fashioneto.service;

import java.util.List;

import com.fashioneto.persistence.Feed;
import com.fashioneto.persistence.User;

/**
 * @author felipe
 *
 */
public interface FeedService {
    
    public List<Feed> getFeeds(User user, int numberOfResults, int offset);

}
