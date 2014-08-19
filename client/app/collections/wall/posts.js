define(function(require){

	//Deps

	Backbone             = require( 'backbone' ),

	MasterBaseCollection = require( 'collections/masterbasecollection' ),
	Model                = require( 'models/wall/post' );


	return MasterBaseCollection.extend({
		model : Model,
		url : App.api.get( 'comment' ) + "/USER",

		init: function(){
			App.vent.on( "profile:dataLoaded", this.handle, this );
		},

		handle: function( data ){
			var posts = data.get( "commentsWrapper" ).collection;
			this.reset( posts );
		},

		comparator: function( model ){
			return -model.get( "id" );
		}

	});

});