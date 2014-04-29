define(function(require){

	var

	$                   = require("jquery"),
	Backbone            = require("backbone"),
	Handlebars          = require("handlebars"),
	Masonry             = require("jquery.masonry"),
	Imagesloaded        = require("jquery.imageloaded"),
	masonryImagesReveal = require("jquery.masonryImagesReveal"),	
	
	BasePageView        = require("views/pages/basepageview"),
	pageTemplate        = require("text!templates/pages/items.hbr"),
	Items               = require("views/items/items");


	return BasePageView.extend({

		template: Handlebars.compile( pageTemplate ),

		pageId: "items",

		url: App.url( "items" ),

		initSubviews: function(){
			this.items = new Items();
		},

		postRender: function(){

			var tabContainer = this.$el.find("#tabContainer");

			tabContainer.empty();

			tabContainer
			.addClass( "masonryContainer" )
			.masonry({
			  itemSelector: '.item',
			  isFitWidth: true
			  
			}).resize();

			tabContainer.masonryImagesReveal( this.items.render().$el );

		}

	});

});