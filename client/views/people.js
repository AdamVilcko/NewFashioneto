define(function(require){
	
	var
	Backbone   = require("backbone"),
	Handlebars = require("handlebars"),
	$          = require("jquery"),

	BasePageView = require("views/basepageview"),
	template = require("text!templates/pages/people.hbr");

	return BasePageView.extend({
		initialize: function(options){
			this.options = options || {};
			this.setEvents();

		},

		setEvents: function(){
			App.vent.on("page:people", this.render, this);		
		},

		template: Handlebars.compile( template ),

		render: function(){
			this.$el.html( this.template() );
		}
	});

});