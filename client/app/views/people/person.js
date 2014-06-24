define(function(require){

	var
	Handlebars     = require("handlebars"),
	template       = require("text!templates/people/person.hbr"),
	MasterBaseView = require( 'views/masterbaseview' );

	return MasterBaseView.extend({
		template: Handlebars.compile( template ),
		className: "people"
	});

});