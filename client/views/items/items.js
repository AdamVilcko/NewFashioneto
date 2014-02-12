define(function(require){

	var
	Backbone   = require("backbone"),
	Handlebars = require("handlebars"),
	$          = require("jquery"),

	template = require("text!templates/items/items.hbr");


	return Backbone.View.extend({
		
		template: Handlebars.compile( template ),

		render: function(){
			this.$el.html( this.template() );
		}
		
	});

});