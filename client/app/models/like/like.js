define(function(require){

	var Backbone = require("backbone");

	return Backbone.Model.extend({
		defaults:{
			count: 0,
			actioned: null
		},

		url: App.rest.like

	});

});