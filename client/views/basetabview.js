define(function(require){
	
	var
	Backbone   = require("backbone"),
	Handlebars = require("handlebars"),
	$          = require("jquery");

	return Backbone.View.extend({

		initialize: function(options){
			
		},

		el: "#tabContainer",

		render: function(){
			this.$el.html( this.template() );
		}

	});

});