define(function(require){	

	Backbone = require( 'backbone' ),

	MasterBaseModel = require( "models/masterbasemodel" );

	return MasterBaseModel.extend({

		defaults: {			
			content: "This is the default model!"			
		},

		imageType: "THUMBNAIL"

	});
});