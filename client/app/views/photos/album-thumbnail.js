define(function(require){

	var
	MasterBaseView = require( 'views/masterbaseview' ),
	Handlebars     = require("handlebars"),
	template       = require("text!templates/photos/album-thumbnail.hbr");

	return MasterBaseView.extend({
		template: Handlebars.compile(template)
	});

});