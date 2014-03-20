define(function(require){
	
	var
	Backbone   = require("backbone"),
	Handlebars = require("handlebars"),
	$          = require("jquery"),

	BasePageView = require("views/pages/basepageview"),
	pageTemplate = require("text!templates/pages/people.hbr");

	return BasePageView.extend({

		template: Handlebars.compile( pageTemplate ),

		pageId: "people",

		initialize: function( options ){
			this.options = options || {};
			this.init( options );
		}
		
	});

});