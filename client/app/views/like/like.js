define(function(require){

	var
	Backbone   = require("backbone"),
	Handlebars = require("handlebars"),
	$          = require("jquery"),

	model      = require("models/like/like"),
	template   = require("text!templates/like/like.hbr");


	 return Backbone.View.extend({

		initialize: function(options){
			this.options = options || { type: "heart", count: 0 };
			this.model = new Model( this.options.data );
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