define(function(require){

	var
	Backbone       = require("backbone"),
	Handlebars     = require("handlebars"),
	$              = require("jquery"),

	template       = require("text!templates/wall/wall.hbr"),
	BaseWidgetView = require("views/sidebar/widgets/basewidgetview");


	return BaseWidgetView.extend({

		nodes:{
			posts: "#postDisplay"
		},

		template: Handlebars.compile( template )

	});

});