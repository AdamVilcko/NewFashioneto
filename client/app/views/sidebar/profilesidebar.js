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
			this.$el
			.html( this.template() );
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