define(function(require){

	var

	$          = require( "jquery" ),
	Handlebars = require( "handlebars" ),
	Backbone   = require( "backbone" ),
	DocumentModel      = require( "backbone.documentmodel" );


	return Backbone.DocumentModel.extend({

		imageType: "STANDARD", //Default

		initialize: function( options ){
			this.options = options || {};
			this.on( "all", this.createImageUrl );
			this.createImageUrl();
			if( typeof this.init !== "undefined" ) this.init();
		},

		createImageUrl: function( args ){
			if( ! this.imageType && this.options.imageType ){
				this.imageType = this.options.imageType;
			}
			if( this.has( "imageId" ) && ! this.has( "imageUrl" ) ){
				this.set( "imageUrl", App.api.get( "image" ) + this.imageType + "/" + this.get( "imageId" ) );
			}
		},

		persist: function( id, options ){
			var url, defaults, settings;

			options = options || {},
			id      = id || this.get( "id" );
			url     = this.url + "/" + id;

			defaults = {
				type: "POST",
				url : url,
				context: this
			};

			settings = $.extend( {}, defaults, options );

			return this.save( null, settings );
		}

	});

});