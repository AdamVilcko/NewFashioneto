package com.fashioneto.ws.entities;

import java.util.Map;

/**
 * @author Felipe Tonon 24 Feb 2014
 **/
public class RequestWrapper
{

	private String id;
	private Map<String, Object> params;

	public RequestWrapper()
	{
	}

	public RequestWrapper(String id, Map<String, Object> params)
	{
		this.id = id;
		this.params = params;
	}

	public String getParameterValue(String paramName)
	{
		if (params == null || params.isEmpty())
		{
			return null;
		}
		return params.get(paramName).toString();
	}

	public boolean hasParameter(String paramName)
	{
		if (params == null || params.isEmpty())
		{
			return false;
		}
		return params.containsKey(paramName);
	}

	public String getId()
	{
		return id;
	}

	public void setId(String id)
	{
		this.id = id;
	}

	public Map<String, Object> getParams()
	{
		return params;
	}

	public void setParams(Map<String, Object> params)
	{
		this.params = params;
	}

}
