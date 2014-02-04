/**
 * 
 */
package com.fashioneto.ws.action;

import net.sourceforge.stripes.action.DefaultHandler;
import net.sourceforge.stripes.action.Resolution;
import net.sourceforge.stripes.action.StreamingResolution;
import net.sourceforge.stripes.action.UrlBinding;
import net.sourceforge.stripes.integration.spring.SpringBean;

import org.springframework.stereotype.Controller;

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
@Controller
public class FashionetoerActionBean extends BaseActionBean
{

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

}
