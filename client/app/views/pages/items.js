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
			this.items.collection.on( "sync", this.renderItemCollection, this );
		},

		beforeSend: function(){
			this.items.collection.fetch( {
				dataType: "jsonp"
			} );
			return false;
		},

		renderItemCollection: function(){
			var tabContainer = this.$( "#tabContainer" );

			if( tabContainer.data( "masonry" ) ){
				tabContainer
				.masonry( 'destroy' );	
			}

			tabContainer
			.html( this.items.render().el );
			this.items.masonry();
			
		},

		events:{
			"keydown .search": "search",
			"click .search-group .btn": "search",
			"keydown .search-group .btn": "search"
		},

		search: function( ev ){
			if( ev.type === "keydown" && ev.which !== 13 ){
				return;
			}

			var
			controls = $( ev.target ).parents( "#controls" ),
			args;

			args = {
				fts : controls.find( ".search" ).val() + " " + controls.find( ".gender" ).val(),
				
			}

			this.items.collection.search( ev, args );
		}

	});

});