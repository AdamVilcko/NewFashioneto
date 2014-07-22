define(function(require){

	var
	Backbone        = require("backbone"),
	Handlebars      = require("handlebars"),
	$               = require("jquery"),
	Helper          = require('helper'),

	BaseSidebarView = require('views/sidebar/basesidebarview'),
	template        = require('text!templates/sidebar/profilesidebar.hbr'),
	MasterBaseView  = require( 'views/masterbaseview' );


	return MasterBaseView.extend({
		template: Handlebars.compile( template ),

		init: function(){
			this.model = this.options.data.details;
		}
	});

});