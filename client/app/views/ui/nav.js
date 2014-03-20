define(function(require){

	var
	Backbone   = require("backbone"),
	Handlebars = require("handlebars"),
	$          = require("jquery"),
	Modernizr  = require("modernizr"),
	Helper     = require('helper'),

	template   = require("text!templates/ui/nav.hbr");


	return Backbone.View.extend({

		initialize: function(options){
			this.options = options || {};
			this.render();
		},

		template: Handlebars.compile( template ),

		events: {
			'click .navbar-toggle' : 'toggleMobileNav',
			'click .subMenu' : 'stopProp'
		},

		render: function(){
			this.$el.html( this.template() );
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