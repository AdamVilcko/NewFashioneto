define(function(require){

	//Deps

	Backbone             = require( 'backbone' ),

	MasterBaseCollection = require( 'collections/masterbasecollection' ),
	Model                = require( 'models/wall/post' );


	return MasterBaseCollection.extend({
		model : Model,
		url : App.api.get( 'wall' ),

		init: function(){
			App.vent.on( "profile:dataLoaded", this.handle, this );
		},

		handle: function( collection ){
			var posts = collection.get( "posts" ).commentsWrapper.collection;
			this.add( posts );
		},
		
		comparator: function( model ){
			 return -model.get( "id" ); // Note the minus!
		}

	});

});