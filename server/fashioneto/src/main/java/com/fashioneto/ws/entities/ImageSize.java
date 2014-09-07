package com.fashioneto.ws.entities;

/**
 * @author Felipe Tonon 17 Apr 2014
 **/
public enum ImageSize
{
	THUMBNAIL("-thumbnail", 51), SMALL("-small", 105), WALL("-wall", 252), STANDARD("", -1);

	private String sufix;
	private int width;

	private ImageSize(String sufix, int defaultWidth)
	{
		this.sufix = sufix;
		this.width = defaultWidth;
	}

	public String getSufix()
	{
		return this.sufix;
	}

	public int getWidth()
	{
		return width;
	}

}
