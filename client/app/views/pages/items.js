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
			this.items.collection.on( "sync", this.loadComponents, this );
		},

		beforeSend: function(){
			this.items.collection.fetch( {
				dataType: "jsonp",
				success: function( collection, response, options){
					console.log( response.products );
				}
			} );
			return false;
		},

		postRender: function(){
			this.items.masonry();
		}

	});

});