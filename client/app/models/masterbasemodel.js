define(function(require){

	var

	$          = require( "jquery" ),
	Handlebars = require( "handlebars" ),
	Backbone   = require( "backbone" );


	return Backbone.Model.extend({

		imageType: "THUMBNAIL", //Default

		initialize: function( options ){
			this.options = options || {};
			this.on( "all", this.createImageUrl );
			this.createImageUrl();
			if( typeof this.init !== "undefined" ) this.init();
		},

		createImageUrl: function( args ){
			if( this.has( "imageId" ) && ! this.has( "imageUrl" ) ){
				this.set( "imageUrl", App.url( "image" ) + this.imageType + "/" + this.get( "imageId" ) );
			}
		},

		persist: function( id, options ){

			options = options || {};
			id = id || this.get( "id" );
			var url = this.url + "/" + id;

			var defaults = {
				type: "POST",
				url : url
			};

			$.extend( defaults, options );


			return this.save( null, defaults );
		}

	});

});