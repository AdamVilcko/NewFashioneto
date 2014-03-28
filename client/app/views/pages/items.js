define(function(require){

	var

	//Deps

	Backbone     = require("backbone"),
	Handlebars   = require("handlebars"),
	$            = require("jquery"),
	Masonry      = require("jquery.masonry"),


	//Base page view

	BasePageView = require("views/pages/basepageview"),

	//Tab views

	//Items        = require("views/items/items"),

	//Main items template

	pageTemplate = require("text!templates/pages/items.hbr");



	return BasePageView.extend({

		template: Handlebars.compile( pageTemplate ),

		pageId: "items",

		initialize: function( options ){
			this.options = options || {};
			this.init( options );
		}

	});

});