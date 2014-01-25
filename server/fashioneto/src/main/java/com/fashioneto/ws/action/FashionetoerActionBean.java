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
import net.sourceforge.stripes.integration.spring.SpringBean;
import net.sourceforge.stripes.validation.ValidationErrorHandler;
import net.sourceforge.stripes.validation.ValidationErrors;

import com.fashioneto.persistence.Fashionetoer;
import com.fashioneto.service.FashionetoerService;
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

	@SpringBean
	private FashionetoerService fashionetoerService;

	@DefaultHandler
	public Resolution view()
	{

		FashionetoMessage message = new FashionetoMessage("Your request was successfull", MessageTypeEnum.INFO);
		Fashionetoer fashionetoer = fashionetoerService.getFashionetoer(1);

		ResponseWrapper rw = new ResponseWrapper(fashionetoer, message);
		Gson gson = new Gson();
		return new StreamingResolution("text", gson.toJson(rw));
	}

	public Resolution handleValidationErrors(ValidationErrors arg0) throws Exception
	{
		Gson gson = new Gson();
		return new StreamingResolution("text", gson.toJson(arg0));
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
