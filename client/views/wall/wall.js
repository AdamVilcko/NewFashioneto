define(function(require){

	var
	Backbone   = require("backbone"),
	Handlebars = require("handlebars"),
	$          = require("jquery"),

	template = require("text!templates/wall/wall.hbr");


	return Backbone.View.extend({

		el: ".wallContainer",

		template: Handlebars.compile( template ),

		render: function(){			
			this.$el.html( this.template() );
		}
		
	});

});