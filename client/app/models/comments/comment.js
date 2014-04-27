define(function(require){

	Backbone = require( 'backbone' ),

	MasterBaseModel = require( "models/masterbasemodel" );

	return MasterBaseModel.extend({
		defaults: {
            content: "Default content!"
		},

		imageType: "THUMBNAIL"

	});
});