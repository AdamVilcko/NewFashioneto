define(function(require){

	var
	Backbone   = require("backbone"),
	Handlebars = require("handlebars"),
	$          = require("jquery"),

	template = require("text!templates/wall/post.hbr");


	return Backbone.View.extend({

		tagName: "article",
		className: "media",

		template: Handlebars.compile( template ),

		render: function(){
			this.$el.html( this.template( this.model.toJSON() ) );
			return this;
		}
		
	});

});