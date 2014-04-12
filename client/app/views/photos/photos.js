define(function(require){

	var
	Backbone   = require("backbone"),
	Handlebars = require("handlebars"),
	$          = require("jquery"),

	MasterBaseView = require( 'views/masterbaseview' ),
	template = require("text!templates/photos/photos.hbr");


	return MasterBaseView.extend({

		template: Handlebars.compile( template ),

		render: function(){
			this.$el.html( this.template() );
			return this;
		}

	});

});