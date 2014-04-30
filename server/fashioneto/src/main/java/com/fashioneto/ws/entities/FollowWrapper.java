package com.fashioneto.ws.entities;

/**
 * @author Felipe Tonon 30 Apr 2014
 **/
public class FollowWrapper
{

	private int id;
	private boolean isFollowed;

	public FollowWrapper()
	{

	}

	public FollowWrapper(int id, boolean isFollowed)
	{
		this.id = id;
		this.isFollowed = isFollowed;
	}

	public int getId()
	{
		return id;
	}

	public void setId(int id)
	{
		this.id = id;
	}

	public boolean isFollowed()
	{
		return isFollowed;
	}

	public void setFollowed(boolean isFollowed)
	{
		this.isFollowed = isFollowed;
	}

	@Override
	public String toString()
	{
		return "FollowWrapper [id=" + id + ", isFollowed=" + isFollowed + "]";
	}

}
