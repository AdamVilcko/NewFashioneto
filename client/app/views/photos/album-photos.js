define(function(require){

	var
	Backbone       = require("backbone"),
	Handlebars     = require("handlebars"),
	$              = require("jquery"),

	MasterBaseView = require( 'views/masterbaseview' ),
	Collection     = require('collections/photos/album-photos'),
	template       = require("text!templates/photos/album-thumbnail.hbr");


	return MasterBaseView.extend({

		init: function(){
			this.collection = new Collection();
			App.vent.on( "profile:dataLoaded", this.update, this );
		},

		update: function( data ){
			this.collection.reset( data.get( "photosWrapper" ).collection );
		},

		template: Handlebars.compile( template )
	});

});