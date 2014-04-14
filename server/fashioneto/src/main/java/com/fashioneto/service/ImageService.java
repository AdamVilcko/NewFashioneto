/**
 * 
 */
package com.fashioneto.service;

import java.io.ByteArrayOutputStream;
import java.util.List;

import com.fashioneto.persistence.Image;

/**
 * @author felipe
 *
 */
public interface ImageService {

	public static final String THUMBNAIL = "thumbnail";
	public static final String SMALL = "small";
	public static final String MEDIUM = "medium";
	public static final String LARGE = "large";
	
	public ByteArrayOutputStream getImageContent(int id, String size);
	
	public List<Image> getImages(int userId);
	
}
