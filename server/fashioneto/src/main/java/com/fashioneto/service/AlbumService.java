package com.fashioneto.service;

import com.fashioneto.persistence.Album;
import com.fashioneto.persistence.User;

/**
 * @author Felipe Tonon 8 Jul 2014
 **/
public interface AlbumService
{
	public final static String ALBUM_UPLOADS = "Uploads";
	public final static String ALBUM_PROFILE = "Profile Pictures";

	public Album getUploadAlbum(User user);

	public Album getAlbum(int albumId);

	public Album getProfileAlbum(User user);
}
