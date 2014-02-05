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

import com.fashioneto.persistence.User;
import com.fashioneto.service.UserService;
import com.fashioneto.ws.entities.FashionetoMessage;
import com.fashioneto.ws.entities.MessageTypeEnum;
import com.fashioneto.ws.entities.ResponseWrapper;

/**
 * @author Felipe
 */
@UrlBinding("/user.do")
@Controller
public class UserActionBean extends BaseActionBean
{

	@SpringBean
	private UserService userService;

	@DefaultHandler
	public Resolution view()
	{

		// http://stackoverflow.com/questions/13459718/could-not-serialize-object-cause-of-hibernateproxy

		FashionetoMessage message = new FashionetoMessage("Your request was successfull", MessageTypeEnum.INFO);
		User fashionetoer = userService.getFashionetoer(1);
		fashionetoer.getReceivedComments();
		ResponseWrapper rw = new ResponseWrapper(fashionetoer, message);
		//		Gson gson = new Gson();
		//		String returnJson = gson.toJson(rw);
		//		return new StreamingResolution("text", returnJson);
		return new StreamingResolution("text", rw.toString());
	}

}
