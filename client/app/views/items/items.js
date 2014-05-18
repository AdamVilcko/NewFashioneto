define(function(require){

	var

	Backbone   = require("backbone"),
	Handlebars = require("handlebars"),
	$          = require("jquery"),
	
	Collection = require("collections/items/items"),
	Item       = require("views/items/item"),
	MasterBaseView   = require( 'views/masterbaseview' );
	

	return MasterBaseView.extend({

		modelView: Item,

		init: function(){
			this.collection = new Collection();
		},

		masonry: function(){
			var target, item;

			target = $( "#tabContainer" );
			target
			.empty()			
			.html( this.renderCollection().el )
			.addClass( "masonryContainer" );

			item = $(".item");
			
			target.imagesLoaded( function(){

				setTimeout( function(){

					target
					.masonry({
					  itemSelector: '.item',
					  gutterWidth: 25,
					  isFitWidth: true
					});

					item
					.each( function( i ){
						$(this).delay( i * 25 ).animate( { opacity: 1 }, 1200 );
					} );

				}, 200 );				

			} );
		}		

	});

});