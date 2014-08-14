define(function(require){

	MasterBaseCollection = require( 'collections/masterbasecollection' ),
	Model                = require( 'models/comments/comment' );


	return MasterBaseCollection.extend({
		model : Model,
		url : App.api.get( "wallComments" )
	});
});