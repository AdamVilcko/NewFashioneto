define(function(require){

	var
	Backbone   = require("backbone"),
	Handlebars = require("handlebars"),
	$          = require("jquery"),
	Masonry    = require("jquery.masonry"),

	template   = require("text!templates/items/items.hbr");


	return Backbone.View.extend({

		template: Handlebars.compile( template ),

		render: function(){
			this.$el.html( this.template() );
			return this;
		}



	});

});