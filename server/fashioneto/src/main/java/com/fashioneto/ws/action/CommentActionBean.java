/**
 * 
 */
package com.fashioneto.ws.action;

import net.sourceforge.stripes.action.DefaultHandler;
import net.sourceforge.stripes.action.HandlesEvent;
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
import com.fashioneto.ws.json.FashionetoJsonFactory;

/**
 * @author Felipe
 */
@UrlBinding("/as/comment/{$event}/{userId}")
@Controller
public class CommentActionBean extends BaseActionBean
{

	//http://stackoverflow.com/questions/725534/converting-a-stripes-application-to-use-friendly-urls

	private String userId;

	@SpringBean
	private UserService userService;

	@DefaultHandler
	public Resolution view()
	{

		return new StreamingResolution("text", "Some text");
	}

	@HandlesEvent("retrieve")
	public Resolution retrieve()
	{

		// http://stackoverflow.com/questions/13459718/could-not-serialize-object-cause-of-hibernateproxy

		FashionetoMessage message = new FashionetoMessage("Your request was successfull", MessageTypeEnum.INFO);
		User fashionetoer = userService.getFashionetoer(Integer.parseInt(userId));
		fashionetoer.getReceivedComments();
		ResponseWrapper rw = new ResponseWrapper(fashionetoer, message);
		//		Gson gson = new Gson();
		//		String returnJson = gson.toJson(rw);
		//		return new StreamingResolution("text", returnJson);
		return new StreamingResolution("text",
				FashionetoJsonFactory.getJson(fashionetoer.getReceivedCommentsCommentSet()));
	}

	public String getUserId()
	{
		return userId;
	}

	public void setUserId(String userId)
	{
		this.userId = userId;
	}

}
