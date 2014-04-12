define(function(require){

	var
	Backbone   = require("backbone"),
	Handlebars = require("handlebars"),
	$          = require("jquery"),
	Helper     = require('helper');

	return Backbone.View.extend({

		render: function(){
			this.$el.html( this.template() );
		},

		close: function(){
			//Other close content here
			this.remove();
		}



	});

});