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

import com.fashioneto.persistence.CommentParentTypeEnum;
import com.fashioneto.persistence.User;
import com.fashioneto.service.UserService;
import com.fashioneto.ws.entities.FashionetoMessage;
import com.fashioneto.ws.entities.MessageTypeEnum;
import com.fashioneto.ws.json.FashionetoJsonFactory;

/**
 * @author Felipe
 */
@UrlBinding("/as/comment/{$event}/{parentType}/{parentId}")
@Controller
public class CommentActionBean extends BaseActionBean
{

	//http://stackoverflow.com/questions/725534/converting-a-stripes-application-to-use-friendly-urls

	private String parentType;
	private String parentId;

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
		User fashionetoer = userService.getFashionetoer(Integer.parseInt(parentId));

		CommentParentTypeEnum commentParentType = CommentParentTypeEnum.valueOf(parentType);

		if (commentParentType.equals(CommentParentTypeEnum.USER))
		{
			fashionetoer.getReceivedComments();
			return new StreamingResolution("text", FashionetoJsonFactory.getJson(fashionetoer
					.getReceivedCommentsCommentSet()));
		}
		return new StreamingResolution("text", "wrong parentType parameter");
	}

	public String getParentType()
	{
		return parentType;
	}

	public void setParentType(String parentType)
	{
		this.parentType = parentType;
	}

	public String getParentId()
	{
		return parentId;
	}

	public void setParentId(String parentId)
	{
		this.parentId = parentId;
	}

}
