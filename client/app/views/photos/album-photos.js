define(function(require){

	var
	Backbone       = require("backbone"),
	Handlebars     = require("handlebars"),
	$              = require("jquery"),

	MasterBaseView = require( 'views/masterbaseview' ),
	Collection     = require('collections/photos/album-photos'),
	AlbumThumbnail = require('views/photos/album-thumbnail');
	

	return MasterBaseView.extend({

		modelView: AlbumThumbnail,

		emptyCollectionTemplate: Handlebars.compile("You are a twat"),

		init: function(){
			App.vent.on( "profile:dataLoaded", this.update, this );
			this.collection = new Collection();
		},

		update: function( data ){
			this.collection.reset( data.get( "imagesWrapper" ).collection );
			return this;
		}

	});

});