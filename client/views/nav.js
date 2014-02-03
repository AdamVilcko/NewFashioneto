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
			'click a' : 'clickState'
		},

		render: function(){
			this.$el.html( this.template() );
		},

		clickState: function(ev){			
			Helper.clickState( this.$el.find("a"), ev );				
		},

		profileClick: function(){

		},

		removeActiveState: function(){
			this.$el.find("li").removeClass("active");
		}

	});
});