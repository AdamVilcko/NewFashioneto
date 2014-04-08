define(function(require){

	var
	Backbone   = require("backbone"),
	Handlebars = require("handlebars"),
	$          = require("jquery"),

	model      = require("models/like/like"),
	template   = require("text!templates/like/like.hbr");


	 return Backbone.View.extend({

		initialize: function( options ){
			this.options = options || { type: "heart", data: { count: 0, actioned: null } };
			this.model = new Model( this.options );
		},

		template: Handlebars.compile( template ),

		render: function(){
			this.$el.html( this.template( this.options ) );
			return this;
		},

		events: {
			'click' : 'registerLike'
		},

		registerLike: function(){
			this.model.save();
		}

	});
});