package com.fashioneto.ws.entities;

/**
 * @author Felipe Tonon 18 Mar 2014
 **/
public class LikesWrapper
{

	public int count;
	public boolean actioned;

	public LikesWrapper(int count, boolean actioned)
	{
		this.count = count;
		this.actioned = actioned;
	}

	public int getCount()
	{
		return count;
	}

	public void setCount(int count)
	{
		this.count = count;
	}

	public boolean isActioned()
	{
		return actioned;
	}

	public void setActioned(boolean actioned)
	{
		this.actioned = actioned;
	}

}
