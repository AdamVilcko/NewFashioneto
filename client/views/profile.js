define(function(require){
	
	var

	//Deps

	$            = require("jquery"),
	Backbone     = require("backbone"),
	Handlebars   = require("handlebars"),	
	Helper       = require('helper'),
	
	//Base page view
	
	BasePageView = require("views/basepageview"),	
	
	//Tab views
	
	Wall         = require("views/wall/wall.js"),
	Photos       = require("views/photos/photos.js"),
	Items        = require("views/items/items.js"),
	
	//Main profile template
	
	pageTemplate = require("text!templates/pages/profile.hbr");
	

	return BasePageView.extend({

		template: Handlebars.compile( pageTemplate ),

		pageId: "profile",

		initialize: function( options ){
			this.options = options || {};	
			this.init( options );
		},

		tabs: {
			wall: new Wall(),
			photos:	new Photos(),
			items: new Items()
		}

	});

});