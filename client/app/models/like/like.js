define(function(require){

	var Backbone = require("backbone"),

	MasterBaseModel = require( "models/masterbasemodel" );

	return MasterBaseModel.extend({

		url: App.api.get( "like" ),

		init: function(){
			App.vent.on( "items:metaSynced", this.update, this );
		},

		update: function( collection ){
			this.set( collection.get( this.get( "id" ) ) );
		}

	});

});