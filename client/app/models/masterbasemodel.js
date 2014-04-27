define(function(require){

	var
	$          = require( "jquery" ),
	Handlebars = require( "handlebars" ),
	Backbone   = require( "backbone" );


	return Backbone.Model.extend({

		initialize: function( options ){
			this.options = options || {};
			this.on( "all", this.createImageUrl );
			this.createImageUrl();
			if( typeof this.init !== "undefined" ) this.init();
		},

		imageType: "THUMBNAIL",

		createImageUrl: function( args ){
			if( this.has( "imageId" ) && ! this.has( "imageUrl" ) ){
				this.set( "imageUrl", App.url( "image" ) + this.imageType + "/" + this.get( "imageId" ) );
			}
		},

		persist: function( id ){
			this.url = this.url + "/" + id;
			return this.save( null, {
				success: function(){

				}
			} );

		}



	});

});