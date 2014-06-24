define(function(require){

	var
	Backbone   = require("backbone"),
	Handlebars = require("handlebars"),
	$          = require("jquery"),

	MasterBaseView = require( 'views/masterbaseview' ),
	Photos = require('photos/photos'),
	Collection = require('collections/photos/album-photos'),
	template = require("text!templates/photos/album.hbr");


	return MasterBaseView.extend({

		template: Handlebars.compile( template ),

		init: function(){
			this.collection = new Collection();
			App.vent.on( "profile:dataLoaded", this.update, this );
		},

		render: function(){
			this.$el.html( this.template() );
			return this;
		},

		renderPhotos: function(){
			this.collection.each( this.renderModel, this );
		}

	});

});