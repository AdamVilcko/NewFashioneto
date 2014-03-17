define(function(require){
	
	var
	Backbone   = require("backbone"),
	Handlebars = require("handlebars"),
	$          = require("jquery")
	
	model      = require("model/like/like"),
	template   = require("templatess/like/like.hbr");	
	

	return Backbone.View.extend({

		initialize: function(options){
			this.options = options || { type: "heart", amount: 0 };
		},

		model : new Model( {
			amount: this.options.amount
		} ),

		template: Handlebars.compile( template ),

		render: function(){
			this.$el.html( this.template( this.options ) );
		},

		events: {
			'click' : 'registerLike'
		},

		registerLike: function(){
			this.model.save();
		}

	});
});