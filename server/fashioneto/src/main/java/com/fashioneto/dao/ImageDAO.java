package com.fashioneto.dao;

import java.util.List;

import com.fashioneto.persistence.Image;

/**
 * @author Felipe Tonon 22 Apr 2014
 **/
public interface ImageDAO
{
	public List<Image> getImages(int userId);
}
