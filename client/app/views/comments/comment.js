define(function(require){

	var
	Backbone   = require("backbone"),
	Handlebars = require("handlebars"),
	$          = require("jquery"),
	Helper     = require("helper"),

	template   = require("text!templates/comments/comment.hbr");


	return Backbone.View.extend({

		className: "media comment",

		template: Handlebars.compile( template ),

		render: function(){
			this.$el.html( this.template( this.model.toJSON() ) );
			Helper.processDate.call( this );
			return this;
		}

	});

});