define(function(require){

	var
	Backbone       = require("backbone"),
	Handlebars     = require("handlebars"),
	$              = require("jquery"),
	
	template       = require("text!templates/people/person.hbr"),
	MasterBaseView = require( 'views/masterbaseview' );

	return MasterBaseView.extend({

		template: Handlebars.compile( template ),

		className: "people",

		render: function(){
			this.$el.html( this.template( this.model.toJSON() ) );
			return this;
		},

	});

});