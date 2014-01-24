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

/**
 * @author Felipe
 *
 */
@UrlBinding("/user.do")
public class FashionetoerActionBean  implements ActionBean, ValidationErrorHandler{

	private ActionBeanContext context;
	
    @DefaultHandler
    public Resolution view() {
		return new StreamingResolution("text", "{\"errors\":false}");
    }
	
	public Resolution handleValidationErrors(ValidationErrors arg0)
			throws Exception {
		// TODO Auto-generated method stub
		return new StreamingResolution("text", "{\"errors\":false}");
	}

	public ActionBeanContext getContext() {
		return  context;
	}

	public void setContext(ActionBeanContext arg0) {
		context = arg0;
		
	}

}
