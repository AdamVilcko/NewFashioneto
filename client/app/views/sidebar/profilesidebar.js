define(function(require){

	var
	Backbone        = require("backbone"),
	Handlebars      = require("handlebars"),
	$               = require("jquery"),
	Helper          = require('helper'),

	BaseSidebarView = require('views/sidebar/basesidebarview'),
	template        = require('text!templates/sidebar/profilesidebar.hbr');


	return BaseSidebarView.extend({

		template: Handlebars.compile( template ),

		init: function(){
			App.vent.on( "profile:dataLoaded", this.renderTo, this );
		},

		renderTo: function( data ){
			this.data = data;
			this.data.imageUrl = App.api.get( "image" ) + data.imageId;

			this.renderToDom();
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