define(function(require){
	
	var
	Backbone   = require("backbone"),
	Handlebars = require("handlebars"),
	$          = require("jquery"),
	Helper     = require('helper'),

	BasePageView = require("views/basepageview"),
	BaseTabView = require("views/basetabview"),

	template = require("text!templates/pages/profile.hbr");



	return BasePageView.extend({
		initialize: function(options){
			this.options = options || {};
			this.setEvents();			
		},

		events:{
			"click .nav-tabs a" : "clickState"
		},

		setEvents: function(){
			App.vent.on("page:profile", this.render, this);	
		},

		template: Handlebars.compile( template ),

		render: function( tab ){			
			this.$el.html( this.template() );
			//Open selected tab
		},

		clickState: function( ev ){
			Helper.clickState( ".nav-tabs a", ev );
		},

		tabs: {
			wall:
		}

	});

});