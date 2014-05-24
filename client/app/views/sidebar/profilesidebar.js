define(function(require){

	var
	Backbone        = require("backbone"),
	Handlebars      = require("handlebars"),
	$               = require("jquery"),
	Helper          = require('helper'),

	BaseSidebarView = require('views/sidebar/basesidebarview'),
	template        = require('text!templates/sidebar/profilesidebar.hbr'),
	MasterBaseView  = require( 'views/masterbaseview' );


	return MasterBaseView.extend({

		template: Handlebars.compile( template ),

		init: function(){
			App.vent.on( "profile:dataLoaded", this.handle, this );
		},

		handle: function( data ){
			this.model = new MasterBaseModel( data.get( "details" ) );
			//this.model.set( "imageUrl", App.api.get( "image" ) + this.model );

			this.render();
			return this;
		},

		widgets: {
			profile: {},
			badges: {},
			followers: {}
		}

		//DOM events

	});

});