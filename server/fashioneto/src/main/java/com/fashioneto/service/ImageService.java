/**
 * 
 */
package com.fashioneto.service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import com.fashioneto.persistence.Album;
import com.fashioneto.persistence.Image;
import com.fashioneto.persistence.User;
import com.fashioneto.ws.entities.ImageSize;

/**
 * @author felipe
 */
public interface ImageService {

    public ByteArrayOutputStream getImageContent(int id, ImageSize size) throws IOException;

    public List<Image> getImages(int userId);

    public List<Integer> getImageIds(int userId);

    public int like(User user, Image image);

    public int dislike(User user, Image image);

    public Image getImage(int imageId);

    public Image uploadProfilePicture(User user, InputStream fileInputStream, String fileExtension) throws IOException;

    public Image uploadImage(User user, InputStream fileInputStream, String fileExtension, Album album) throws IOException;

}
