/**
 * 
 */
package com.fashioneto.ws.rest;

import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.fashioneto.persistence.Feed;
import com.fashioneto.persistence.User;
import com.fashioneto.service.FeedService;
import com.fashioneto.utils.ContextUtils;
import com.fashioneto.utils.NoUserInContextException;
import com.fashioneto.ws.entities.DefaultSet;
import com.fashioneto.ws.json.FashionetoJsonFactory;

/**
 * @author felipe
 *
 */

@Component
@Path("/feed")
public class FeedRestBean {

    
    
    @Autowired
    protected FeedService FeedService;
    
    @GET
    @Path("/{firstPosition}/{numberOfRecords}")
    public Response getFeeds(@PathParam("firstPosition") int firstPosition, @PathParam("numberOfRecords") int numberOfRecords) throws NoUserInContextException {
	
	User user = ContextUtils.getUserFromAuthenticationContext();
	DefaultSet<Feed> feeds = new DefaultSet<Feed>(FeedService.getFeeds(user, numberOfRecords, firstPosition));
	
	return Response.status(Status.OK).entity(FashionetoJsonFactory.getJson(feeds)).build();
	
    }
}
