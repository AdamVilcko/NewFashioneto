define(functon(require){

	var Backbone = require("backbone");

	return Backbone.model.extend({
		defaults:{
			amount: 0
		},

		url:""

	});

});