define(function(require){

	//Deps

	Backbone             = require( 'backbone' );

	MasterBaseCollection = require( 'collections/masterbasecollection' ),
	Model                = require( 'models/people/person' );


	return MasterBaseCollection.extend({
		model : Model,
		url : App.api.get( "people" )
	});
});