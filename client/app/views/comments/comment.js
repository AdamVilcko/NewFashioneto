define(function(require){

	var
	Backbone   = require("backbone"),
	Handlebars = require("handlebars"),
	$          = require("jquery"),
	Helper     = require("helper"),

	MasterBaseView = require( 'views/masterbaseview' ),
	template   = require("text!templates/comments/comment.hbr");



	return MasterBaseView.extend({

		contextId: "comment",

		className: "media comment",

		template: Handlebars.compile( template )		

	});

});