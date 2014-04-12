define(function(require){

	var
	Backbone   = require("backbone"),
	Handlebars = require("handlebars"),
	$          = require("jquery"),
	Modernizr  = require("modernizr"),
	Helper     = require('helper'),

	MasterBaseView = require( 'views/masterbaseview' ),
	template   = require("text!templates/ui/nav.hbr");


	return MasterBaseView.extend({

		init: function(options){
			this.render();
		},

		template: Handlebars.compile( template ),

		events: {
			'click .navbar-toggle' : 'toggleMobileNav',
			'click .subMenu' : 'stopProp'
		},

		render: function(){
			this.$el.html( this.template( App.data.profile.details ) );
			return this;
		},

		toggleMobileNav: function( ev ){
			Helper.toggleMobileNav( ev );
		},

		stopProp: function( ev ){
			ev.stopPropagation();
		}

	});
});