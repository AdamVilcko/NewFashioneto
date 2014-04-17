/*
 * Copyright Telrock Communications Limited 2008 * 
 *
 * $Header:  $
 * $Revision:  $
 * $Date:  $ 
 * 
 */
package com.fashioneto.ws.entities;

/**
 * @author Felipe Tonon 17 Apr 2014
 **/
public enum ImageSizeEnum
{
	THUMBNAIL("-thumbnail"), SMALL("-small"), STANDARD("");

	private String sufix;

	private ImageSizeEnum(String sufix)
	{
		this.sufix = sufix;
	}

	public String getSufix()
	{
		return this.sufix;
	}
}
