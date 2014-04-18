define(function(require){

	//Deps

	Backbone             = require( 'backbone' );

	MasterBaseCollection = require( 'collections/masterbasecollection' ),
	Model                = require( 'models/items/item' );


	return MasterBaseCollection.extend({
		model : Model,
		url : App.url( "items" )
	});
});