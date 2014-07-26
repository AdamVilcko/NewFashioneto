define(function(require){

	//Deps

	Backbone             = require( 'backbone' ),

	MasterBaseCollection = require( 'collections/masterbasecollection' ),
	Model                = require( 'models/wall/post' );


	return MasterBaseCollection.extend({
		model : Model,
		url : App.api.get( 'wall' ) + "/USER",

		init: function(){
			App.vent.on( "profile:dataLoaded", this.handle, this );
		},

		handle: function( collection ){
			var posts = collection.get( "commentsWrapper" ).collection;
			this.reset( posts );
		},

		comparator: function( model ){
			 return -model.get( "id" ); // Note the minus!
		}

	});

});