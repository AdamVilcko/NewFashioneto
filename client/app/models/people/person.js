define(function(require){

	var

	MasterBaseModel = require( "models/masterbasemodel" );

	return MasterBaseModel.extend({

		init: function(){
			this.createImageUrl();
			this.on( "all", this.createImageUrl, this );
		},

		createImageUrl: function( args ){
			if( this.has( "id" ) && ! this.has( "imageUrl" ) ){
				this.set( "imageUrl", App.url( "image" ) + this.imageType + "/" + this.get( "id" ) );
			}
		},

		imageType: "STANDARD"

	});

});