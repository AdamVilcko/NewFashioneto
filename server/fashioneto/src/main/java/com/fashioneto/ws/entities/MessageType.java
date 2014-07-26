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
 * @author Felipe Tonon 24 Jan 2014
 **/
public enum MessageType
{
	WARNING, INFO, ERROR;

	public String getSomething()
	{
		return this.name();
	}
}
