define(function(require){

	var
	Backbone       = require("backbone"),
	Handlebars     = require("handlebars"),
	$              = require("jquery"),

	Like           = require("views/like/like"),
	template       = require("text!templates/items/item.hbr"),
	MasterBaseView = require( 'views/masterbaseview' );


	return MasterBaseView.extend({

		template: Handlebars.compile( template ),

		className: "item thumbnail",

		contextId: "item"

	});

});