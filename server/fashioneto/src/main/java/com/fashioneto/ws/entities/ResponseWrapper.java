/*
 * Copyright Telrock Communications Limited 2008 * 
 *
 * $Header:  $
 * $Revision:  $
 * $Date:  $ 
 * 
 */
package com.fashioneto.ws.entities;

import com.google.gson.annotations.Expose;

/**
 * @author Felipe Tonon 24 Jan 2014
 **/
public class ResponseWrapper
{

	@Expose
	private Object result;
	@Expose
	private String resultType;
	@Expose
	private FashionetoMessage message;

	public ResponseWrapper(Object result)
	{
		this.result = result;
		this.resultType = result.getClass().getSimpleName();
	}

	public ResponseWrapper(Object result, FashionetoMessage message)
	{
		this.message = message;
		this.result = result;
		this.resultType = result.getClass().getSimpleName();
	}

	public void setResult(Object result)
	{
		this.result = result;
		this.resultType = result.getClass().getSimpleName();
	}

	public String getResultType()
	{
		return resultType;
	}

	public FashionetoMessage getMessage()
	{
		return message;
	}

	public void setMessage(FashionetoMessage message)
	{
		this.message = message;
	}

	public Object getResult()
	{
		return result;
	}

	@Override
	public String toString()
	{
		return "ResponseWrapper [result=" + result + ", resultType=" + resultType + ", message=" + message + "]";
	}

}
