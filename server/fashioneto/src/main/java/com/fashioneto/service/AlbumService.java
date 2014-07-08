package com.fashioneto.service;

import com.fashioneto.persistence.Album;
import com.fashioneto.persistence.User;

/**
 * @author Felipe Tonon 8 Jul 2014
 **/
public interface AlbumService
{

	public Album getUploadAlbum(User user);

	public Album getAlbum(int albumId);
}
