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
public class FashionetoMessage
{

	private String content;
	private MessageTypeEnum type;

	public FashionetoMessage(String messageContent, MessageTypeEnum messageType)
	{
		this.content = messageContent;
		this.type = messageType;
	}

	public String getContent()
	{
		return content;
	}

	public void setContent(String content)
	{
		this.content = content;
	}

	public MessageTypeEnum getType()
	{
		return type;
	}

	public void setType(MessageTypeEnum type)
	{
		this.type = type;
	}

}
