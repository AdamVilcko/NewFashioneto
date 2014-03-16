package com.fashioneto.ws.entities;

import java.util.Map;

/**
 * @author Felipe Tonon 24 Feb 2014
 **/
public class RequestWrapper
{

	private String requestId;
	private int userId;
	private Map<String, Object> params;

	public RequestWrapper()
	{
	}

	public RequestWrapper(String requestId, int userId, Map<String, Object> params)
	{
		this.requestId = requestId;
		this.userId = userId;
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

	public String getRequestId()
	{
		return requestId;
	}

	public void setRequestId(String requestId)
	{
		this.requestId = requestId;
	}

	public int getUserId()
	{
		return userId;
	}

	public void setUserId(int userId)
	{
		this.userId = userId;
	}

	public Map<String, Object> getParams()
	{
		return params;
	}

	public void setParams(Map<String, Object> params)
	{
		this.params = params;
	}

	@Override
	public String toString()
	{
		return "RequestWrapper [requestId=" + requestId + ", userId=" + userId + ", params=" + params + "]";
	}

}
