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
				
				var details = this.get("details");
				if (details.profileImageId) {
					this.set( "imageUrl", App.api.get( "image" ) + this.imageType + "/" + details.profileImageId );
				} else {
					// url for generic avatar
				}
				
			}
		},

		imageType: "STANDARD"

	});

});