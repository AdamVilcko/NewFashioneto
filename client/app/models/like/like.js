define(function(require){

	var Backbone = require("backbone");

	return Backbone.Model.extend({
		defaults:{
			amount: 0,
			liked: null
		},

		url: App.rest.like

	});

});