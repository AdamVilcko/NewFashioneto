define(function(require){

	var
	Backbone        = require("backbone"),
	Handlebars      = require("handlebars"),
	$               = require("jquery"),
	UploaderModal   = require('views/photos/uploader-modal'),

	MasterBaseView  = require('views/masterbaseview'),
	MasterBaseModel = require( 'models/masterbasemodel' ),
	Photos          = require('views/photos/album-photos'),
	template        = require("text!templates/photos/album.hbr");


	return MasterBaseView.extend({

		template: Handlebars.compile( template ),

		init: function(){
			this.photos = new Photos();
			this.photos.collection.on("reset add", this.render, this );
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
		},

		events:{
			"click #addPhotos": function(){
				this.uploaderModal = new UploaderModal({
					collection: this.photos.collection
				});
			}
		}

	});

});