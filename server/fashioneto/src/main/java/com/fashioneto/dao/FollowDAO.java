package com.fashioneto.dao;

/**
 * @author Felipe Tonon 23 Apr 2014
 **/
public interface FollowDAO
{

	public int follow(int idUser, int idFollowedUser);

	public int unfollow(int idUser, int idFollowedUser);

}
