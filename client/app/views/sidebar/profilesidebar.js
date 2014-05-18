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

		render: function(){
			var data = this.master.data.details;
			data.imageUrl = App.api.get( "image" ) + data.imageId;

			this.$el
			.html( this.template( data ) );
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