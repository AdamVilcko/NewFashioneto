define(function(require){

	var

	MasterBaseCollection = require( 'collections/masterbasecollection' ),
	Model                = require( 'models/people/person' );


	return MasterBaseCollection.extend({
		model : Model,
		url : App.api.get( "people" )
	});
});