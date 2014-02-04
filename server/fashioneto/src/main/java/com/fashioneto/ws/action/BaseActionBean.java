/*
 * 
 */
package com.fashioneto.ws.action;

import net.sourceforge.stripes.action.ActionBean;
import net.sourceforge.stripes.action.ActionBeanContext;
import net.sourceforge.stripes.action.Resolution;
import net.sourceforge.stripes.action.StreamingResolution;
import net.sourceforge.stripes.validation.ValidationErrorHandler;
import net.sourceforge.stripes.validation.ValidationErrors;

import com.google.gson.Gson;

/**
 * @author Felipe Tonon 4 Feb 2014
 **/
public class BaseActionBean implements ActionBean, ValidationErrorHandler
{
	private ActionBeanContext context;

	public ActionBeanContext getContext()
	{
		return context;
	}

	public void setContext(ActionBeanContext arg0)
	{
		context = arg0;

	}

	public Resolution handleValidationErrors(ValidationErrors errors) throws Exception
	{
		Gson gson = new Gson();
		return new StreamingResolution("text", gson.toJson(errors));
	}
}
