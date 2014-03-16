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
			//this.setEvents();
		},

		el:"#nav",

		template: Handlebars.compile( template ),

		events: {
			'click a' : 'clickState',
			'click .navbar-toggle' : 'toggleMobileNav',
			'click .subMenu' : 'stopProp'
		},

		render: function(){
			this.$el.html( this.template() );
		},		

		toggleMobileNav: function( ev ){
			Helper.toggleMobileNav( ev );
		},

		profileClick: function(){

		},

		removeActiveState: function(){
			this.$el.find("li").removeClass("active");
		},

		stopProp: function( ev ){
			ev.stopPropagation();
		}

	});
});