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
			console.log( this.master.data().details );
			this.$el
			.html( this.template( this.master.data().details ) );
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