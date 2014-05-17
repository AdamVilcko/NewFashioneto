define(function(require){

	var

	_ = require("_"),

	Collection     = require("collections/people/people"),
	Person         = require("views/people/person"),
	MasterBaseView = require("views/masterbaseview"),
	Imagesloaded = require("jquery.imageloaded");


	return MasterBaseView.extend({

		modelView: Person,

		init: function(){
			this.collection = new Collection();
		},

		masonry: function(){
			var target, people;

			target = $( "#tabContainer" );
			target
			.empty()			
			.html( this.renderCollection().el )
			.addClass( "masonryContainer" );

			people = $(".people");
			
			target.imagesLoaded( function(){

				setTimeout( function(){
					target					
					.masonry({
					  itemSelector: '.people',
					  gutterWidth: 25,
					  isFitWidth: true
					});

					people
					.each( function( i ){
						$(this).delay( i * 25 ).animate( { opacity: 1 }, 1200 );
					} );

				}, 500 );				

			} );
		}

	});

});