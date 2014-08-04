define(function(require){

	var
	Backbone              = require("backbone"),
	Handlebars            = require("handlebars"),
	$                     = require("jquery"),
	UploaderModal         = require('views/photos/uploader-modal'),

	MasterBaseView        = require('views/masterbaseview'),
	AlbumPhotosCollection = require('collections/photos/album-photos'),
	MasterBaseModel       = require( 'models/masterbasemodel' );
	Photos                = require('views/photos/album-photos'),
	template              = require("text!templates/photos/album.hbr");

	return function(vOpts){
		var self = this, mOpts, albumPhotosCollection,

		View = MasterBaseView.extend({
			template: Handlebars.compile( template ),

			init: function(){
				self.photos = new Photos( mOpts );
				self.model = new MasterBaseModel();
			},

			preRender: function(){
				self.model.set({
					count: self.photos.collection.length
				});
			},

			postRender: function(){
				self.$("#photosContainer")
				.html( self.photos.renderCollection().el );
				return self;
			},

			events:{
				"click #addPhotos": function(){
					self.uploaderModal = new UploaderModal();
				}
			}

		});

		mOpts = vOpts;
		_.extend( self, new View(vOpts) );
		return self;
	}

});