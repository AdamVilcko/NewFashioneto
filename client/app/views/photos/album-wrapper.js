define(function(require){

	var
	Backbone        = require("backbone"),
	Handlebars      = require("handlebars"),
	$               = require("jquery"),

	MasterBaseView  = require('views/masterbaseview'),
	MasterBaseModel = require( 'models/masterbasemodel' );
	Photos          = require('views/photos/album-photos'),
	template        = require("text!templates/photos/album.hbr");


	return MasterBaseView.extend({

		template: Handlebars.compile( template ),

		init: function(){
			this.photos = new Photos();
			this.photos.collection.on("reset", this.renderPhotos, this );
			this.model = new MasterBaseModel();
		},

		preRender: function(){
			this.model.set({
				count: this.photos.collection.length
			});
		},

		postRender: function(){
			this.$("#photosContainer")
			.html( this.photos.renderCollection( null, { collection: this.photos.collection } ).el );
			return this;
		}

	});

});