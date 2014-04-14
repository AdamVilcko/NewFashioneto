/**
 * 
 */
package com.fashioneto.ws.rest;

import javax.ws.rs.Path;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.fashioneto.service.CommentService;

/**
 * @author felipe
 *
 */
@Path("/image")
@Component
public class ImageRestBean {

	
	@Autowired
	protected CommentService commentService;
	
	
	
}
