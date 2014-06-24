define(function(require){

	//Deps

	MasterBaseCollection = require( 'collections/masterbasecollection' ),
	Model                = require( 'models/masterbasemodel' );


	return MasterBaseCollection.extend({
		model : Model,
		url : App.api.get( "photos" )
	});
});