define(function(require){

	//Deps

	Backbone             = require( 'backbone' );

	MasterBaseCollection = require( 'collections/masterbasecollection' ),
	Model                = require( 'models/comments/comment' );


	return MasterBaseCollection.extend({
		model : Model,
		url : App.url( "wallComments" )
	});
});