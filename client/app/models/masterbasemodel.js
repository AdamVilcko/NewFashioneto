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
			var url, defaults, settings;

			options = options || {},;
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

		//Loop through object code
		/*for (var key in p) {
		  if (p.hasOwnProperty(key)) {
		    alert(key + " -> " + p[key]);
		  }
		}*/

	});

});