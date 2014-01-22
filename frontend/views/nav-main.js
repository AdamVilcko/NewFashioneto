define(function(require){
	
	var
	Backbone   = require("backbone"),
	Handlebars = require("handlebars"),
	$          = require("jquery"),
	Modernizr  = require("modernizr"),
	
	template   = require("text!templates/ui/nav-main.hbr");

	return Backbone.View.extend({
		initialize: function(options){
			this.options = options || {};			
			this.render();
			//this.setEvents();
		},

		el:"#nav-main",

		template: Handlebars.compile( template ),

		events: {
			'click a' : 'clickState'
		},

		render: function(){
			this.$el.html( this.template() );
		},

		clickState: function(ev){
			var
			links  = this.$el.find( "a" ),
			active = "active",
			evType;
			
			if ( Modernizr.touch )
				evType = "touchstart";
			else
				evType = "click";						
			links.parent().removeClass( active );
			$(ev.target).parent().addClass( active );			
		}
	});
});