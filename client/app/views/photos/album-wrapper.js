define(function(require){

	var
	Backbone       = require("backbone"),
	Handlebars     = require("handlebars"),
	$              = require("jquery"),

	MasterBaseView = require( 'views/masterbaseview' ),
	Photos         = require('views/photos/album-photos'),
	template       = require("text!templates/photos/album.hbr");


	return MasterBaseView.extend({

		template: Handlebars.compile( template ),

		init: function(){
			App.vent.on( "profile:dataLoaded", this.update, this );
			this.photos = new Photos();
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