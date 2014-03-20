define(function(require){
	
	var
	Backbone       = require("backbone"),
	Handlebars     = require("handlebars"),
	$              = require("jquery"),
	Helper         = require('helper'),
	
	MasterBaseView = require( 'views/masterbaseview' );
	

	return MasterBaseView.extend({		

		nodes:{},

		render: function(){
			this.$el
			.html( this.template() );
			return this;
		}

		//DOM events

	});

});