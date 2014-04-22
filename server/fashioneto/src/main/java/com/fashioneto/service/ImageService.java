/**
 * 
 */
package com.fashioneto.service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

import com.fashioneto.persistence.Image;
import com.fashioneto.ws.entities.ImageSizeEnum;

/**
 * @author felipe
 */
public interface ImageService
{

	public ByteArrayOutputStream getImageContent(int id, ImageSizeEnum size) throws IOException;

	public List<Image> getImages(int userId);

	public String getImagePath(int userId);

	public List<Integer> getImageIds(int userId);

}
