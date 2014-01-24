/**
 * 
 */
package com.fashioneto.ws.action;

import net.sourceforge.stripes.action.ActionBean;
import net.sourceforge.stripes.action.ActionBeanContext;
import net.sourceforge.stripes.action.DefaultHandler;
import net.sourceforge.stripes.action.Resolution;
import net.sourceforge.stripes.action.StreamingResolution;
import net.sourceforge.stripes.action.UrlBinding;
import net.sourceforge.stripes.validation.ValidationErrorHandler;
import net.sourceforge.stripes.validation.ValidationErrors;

import com.fashioneto.persistence.Fashionetoer;
import com.fashioneto.ws.entities.FashionetoMessage;
import com.fashioneto.ws.entities.MessageTypeEnum;
import com.fashioneto.ws.entities.ResponseWrapper;
import com.google.gson.Gson;

/**
 * @author Felipe
 */
@UrlBinding("/user.do")
public class FashionetoerActionBean implements ActionBean, ValidationErrorHandler
{

	private ActionBeanContext context;

	@DefaultHandler
	public Resolution view()
	{

		FashionetoMessage message = new FashionetoMessage("Your request was successfull", MessageTypeEnum.INFO);

		ResponseWrapper rw = new ResponseWrapper(new Fashionetoer(1, "John Doe", "john@doe.com"), message);
		Gson gson = new Gson();
		return new StreamingResolution("text", gson.toJson(rw));
	}

	public Resolution handleValidationErrors(ValidationErrors arg0) throws Exception
	{
		// TODO Auto-generated method stub
		return new StreamingResolution("text", "{\"errors\":false}");
	}

	public ActionBeanContext getContext()
	{
		return context;
	}

	public void setContext(ActionBeanContext arg0)
	{
		context = arg0;

	}

}
