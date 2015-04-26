/**
 * 
 */
package com.fashioneto.service;

import java.awt.image.BufferedImage;
import java.awt.image.DataBufferByte;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.ByteBuffer;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;



import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fashioneto.dao.ImageDAO;
import com.fashioneto.persistence.Album;
import com.fashioneto.persistence.Image;
import com.fashioneto.persistence.User;
import com.fashioneto.utils.TokenUtils;
import com.fashioneto.ws.entities.ImageSize;
import com.google.appengine.api.images.ImagesService;
import com.google.appengine.api.images.ImagesServiceFactory;
import com.google.appengine.api.images.Transform;
import com.google.appengine.tools.cloudstorage.GcsFileOptions;
import com.google.appengine.tools.cloudstorage.GcsFilename;
import com.google.appengine.tools.cloudstorage.GcsInputChannel;
import com.google.appengine.tools.cloudstorage.GcsOutputChannel;
import com.google.appengine.tools.cloudstorage.GcsService;
import com.google.appengine.tools.cloudstorage.GcsServiceFactory;
import com.google.appengine.tools.cloudstorage.RetryParams;

/**
 * @author felipe
 */
@Service("imageService")
@Transactional
public class ImageServiceImpl implements ImageService {
    private static final String DEFAULT_EXTENSION = "jpg";
    private static final String FASHIONETO_BUCKET_NAME = "fashioneto_bucket1";

    private final GcsService gcsService =
    	    GcsServiceFactory.createGcsService(RetryParams.getDefaultInstance());

    @Autowired
    private ImageDAO imageDAO;
    @Autowired
    private AlbumService albumService;

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public int like(User user, Image image) {
	image.addLiker(user);
	entityManager.merge(image);
	return image.getLikedBy().size();
    }

    @Override
    public int dislike(User user, Image image) {
	image.removeLiker(user);
	entityManager.merge(image);
	return image.getLikedBy().size();
    }

    @Override
    public Image uploadProfilePicture(User user, InputStream fileInputStream, String fileExtension) throws IOException {
	Album profileAlbum = albumService.getProfileAlbum(user);
	Image newProfileImage = uploadImage(user, fileInputStream, fileExtension, profileAlbum);
	
	user.setProfileImage(newProfileImage);
	entityManager.merge(user);
	
	return newProfileImage;
    }

    
    @Override
    public void uploadProfilePicture(User user, Image image) throws IOException {
    	Album profileAlbum = albumService.getProfileAlbum(user);
    	user.setProfileImage(image);
    	entityManager.merge(user);
    }

    
    private void saveImageToBucket(byte[] imageBytes, String imageName) throws IOException {
    	GcsFilename  imageFullPathNameInBucket = new GcsFilename(FASHIONETO_BUCKET_NAME, imageName);
    	GcsOutputChannel outputChannel =
    		    gcsService.createOrReplace(imageFullPathNameInBucket, GcsFileOptions.getDefaultInstance());
    	outputChannel.write(ByteBuffer.wrap(imageBytes));
    	outputChannel.close();
    }
    
    private void saveImageToBucket(BufferedImage bufferedImage, String imageName) throws IOException {
    	byte[] imageBytes = ((DataBufferByte) bufferedImage.getData().getDataBuffer()).getData();
	    GcsFilename  imageFullPathNameInBucket = new GcsFilename(FASHIONETO_BUCKET_NAME, imageName);
    	GcsOutputChannel outputChannel =
    		    gcsService.createOrReplace(imageFullPathNameInBucket, GcsFileOptions.getDefaultInstance());
    	outputChannel.write(ByteBuffer.wrap(imageBytes));
    	outputChannel.close();
    }
    
    
    private void saveConvertedImage(byte[] originalImageBytes, int width, String imageFullPathName) throws IOException {
    	ImagesService imagesService = ImagesServiceFactory.getImagesService();
    	com.google.appengine.api.images.Image originalImage = ImagesServiceFactory.makeImage(originalImageBytes);
        
    	Transform resize = ImagesServiceFactory.makeResize(width, width);
    	com.google.appengine.api.images.Image newImage = imagesService.applyTransform(resize, originalImage);

        byte[] newImageData = newImage.getImageData();
        saveImageToBucket(newImageData, imageFullPathName);
    }
    
    private byte[] read(ByteArrayInputStream bais) throws IOException {
        byte[] array = new byte[bais.available()];
        bais.read(array);
        return array;
   }
    
    @Override
    public Image uploadImage(User user, InputStream fileInputStream, String fileExtension, Album album) throws IOException {

	String newFilename = TokenUtils.createTokenImageName(user);

	byte[] originalImageBytes = IOUtils.toByteArray(fileInputStream);

	
	saveConvertedImage(originalImageBytes, ImageSize.WALL.getWidth(), getFullImagePath(newFilename, ImageSize.WALL));
	saveConvertedImage(originalImageBytes, ImageSize.SMALL.getWidth(), getFullImagePath(newFilename, ImageSize.SMALL));
	saveConvertedImage(originalImageBytes, ImageSize.THUMBNAIL.getWidth(), getFullImagePath(newFilename, ImageSize.THUMBNAIL));
	
	
	saveImageToBucket(originalImageBytes, getFullImagePath(newFilename, ImageSize.STANDARD));
	
	Image image = new Image();
	image.setDate(new Date());
	image.setFilename(newFilename);
	image.setUser(user);
	image.setFileExtension(DEFAULT_EXTENSION);

	image.setAlbum(album);
	image = entityManager.merge(image);

	System.gc();

	return image;
    }

    private String getFullImagePath(String filename, ImageSize imageSize) {
    	return  filename + imageSize.getSufix() + '.' + DEFAULT_EXTENSION;
    }

    @Override
    public ByteArrayOutputStream getImageContent(int id, ImageSize size) throws IOException {
	Image image = entityManager.find(Image.class, id);
	if (image != null) {
		String fileName = image.getFullFilename(size.getSufix());
		GcsFilename gcsFilename = new GcsFilename(FASHIONETO_BUCKET_NAME, fileName);
		int fileSize = (int) gcsService.getMetadata(gcsFilename).getLength();
		ByteBuffer result = ByteBuffer.allocate(fileSize);
		try (GcsInputChannel readChannel = gcsService.openReadChannel(gcsFilename, 0)) {
		  readChannel.read(result);
		}
		byte[] byteArray = result.array();
		ByteArrayOutputStream baos = new ByteArrayOutputStream(byteArray.length);
		baos.write(byteArray, 0, byteArray.length);
	    return baos;
	}
	return null;
    }

    @Override
    public List<Image> getImages(int userId) {
	return imageDAO.getImages(userId);
    }

    @Override
    public List<Integer> getImageIds(int userId) {
	List<Integer> ids = new ArrayList<Integer>();
	List<Image> images = imageDAO.getImages(userId);
	if (images != null) {
	    for (Image image : imageDAO.getImages(userId)) {
		ids.add(image.getId());
	    }
	}
	return ids;
    }

    @Override
    public Image getImage(int imageId) {
	return entityManager.find(Image.class, imageId);
    }

}
