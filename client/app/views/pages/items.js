define(function(require){

	var

	//Deps

	Backbone     = require("backbone"),
	Handlebars   = require("handlebars"),
	$            = require("jquery"),
	Masonry      = require("jquery.masonry"),

	BasePageView = require("views/pages/basepageview"),
	pageTemplate = require("text!templates/pages/items.hbr"),
	Items = require("text!items/items");



	return BasePageView.extend({

		template: Handlebars.compile( pageTemplate ),

		pageId: "items",

		initSubviews: function(){
			this.items = new Items();
		},

		postRender: function(){
			var tabContainer = this.$el.find("#tabContainer");
			tabContainer.empty();
			tabContainer.html( this.items.render().el );
		}

	});

});