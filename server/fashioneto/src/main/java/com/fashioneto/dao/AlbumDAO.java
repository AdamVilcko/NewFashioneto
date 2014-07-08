package com.fashioneto.dao;

import com.fashioneto.persistence.Album;
import com.fashioneto.persistence.User;

/**
 * @author Felipe Tonon 8 Jul 2014
 **/
public interface AlbumDAO
{
	public Album getAlbumByName(User user, String name);
}
