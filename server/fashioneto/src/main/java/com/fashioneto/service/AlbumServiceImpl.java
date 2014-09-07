package com.fashioneto.service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fashioneto.dao.AlbumDAO;
import com.fashioneto.persistence.Album;
import com.fashioneto.persistence.User;

/**
 * @author Felipe Tonon 8 Jul 2014
 **/

@Service("albumService")
public class AlbumServiceImpl implements AlbumService {

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private AlbumDAO albumDAO;

    @Override
    public Album getUploadAlbum(User user) {
	return albumDAO.getAlbumByName(user, ALBUM_UPLOADS);
    }

    @Override
    public Album getProfileAlbum(User user) {
	return albumDAO.getAlbumByName(user, ALBUM_PROFILE);
    }

    @Override
    public Album getAlbum(int albumId) {
	return entityManager.find(Album.class, albumId);
    }
}
