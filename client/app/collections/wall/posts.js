define(function(require){

	//Deps

	Backbone             = require( 'backbone' ),

	MasterBaseCollection = require( 'collections/masterbasecollection' ),
	Model                = require( 'models/wall/post' );


	return MasterBaseCollection.extend({
		model : Model,
		url : App.api.get( 'wall' ),
		
		comparator: function( model ){
			 return -model.get( "id" ); // Note the minus!
		}

	});

});