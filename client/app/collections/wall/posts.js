define(function(require){

	//Deps

	Backbone             = require( 'backbone' ),

	MasterBaseCollection = require( 'collections/masterbasecollection' ),
	Model                = require( 'models/wall/post' );


	return MasterBaseCollection.extend({
		model : Model,
		url : App.url( 'wall' ),
		initialize: function(){
			App.vent.on( "login:load", this.handle, this );
		},

		handle: function(){
			this.add( App.data.profile.commentsWrapper );
		}
	});

});