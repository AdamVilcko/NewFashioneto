define(function(require){

	var
	Backbone             = require("backbone"),
	Handlebars           = require("handlebars"),
	$                    = require("jquery"),
	Helper               = require('helper'),
	
	Cropper         = require( 'jquery.cropper' )
	Photos          = require('views/photos/album-photos'),
	ProfilePhotoUploader   = require('views/photos/profile-photo-uploader'),
	BaseSidebarView      = require('views/sidebar/basesidebarview'),
	template             = require('text!templates/sidebar/profilesidebar.hbr'),
	MasterBaseView       = require( 'views/masterbaseview' );


	return MasterBaseView.extend({

		template: Handlebars.compile( template ),

		init: function(){
			App.vent.on( "profile:dataLoaded", this.handle, this );
			this.photos = new Photos();
			this.photos.collection.on("reset add", this.render, this );
		},

		handle: function( data ){
			this.model = new MasterBaseModel( data.toJSON(), { imageType: "STANDARD" } );
			return this;
		},

		widgets: {
			profile: {},
			badges: {},
			followers: {}
		},

		//DOM events

		events:{
			"click #profileBox .picture" : function(){
				this.uploaderModal = new ProfilePhotoUploader({
					collection: this.photos.collection
				});
			},
			"click #profileBox .btn" : function(){
			this.uploaderModal = new ProfilePhotoUploader({
				collection: this.photos.collection
			});
		}
		}

	});

});