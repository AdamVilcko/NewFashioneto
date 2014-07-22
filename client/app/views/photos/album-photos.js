define(function(require){

	var
	Backbone       = require("backbone"),
	Handlebars     = require("handlebars"),
	$              = require("jquery"),

	MasterBaseView = require( 'views/masterbaseview' ),
	AlbumThumbnail = require('views/photos/album-thumbnail');

	return MasterBaseView.extend({

		modelView: AlbumThumbnail,

		emptyCollectionTemplate: Handlebars.compile("You are a twat"),

		init: function(){
			this.collection = this.options.collection;
		}

	});

});