define(function(require){

	var Backbone = require("backbone");

	return Backbone.Model.extend({

		defaults: {
			id: 1,
			itemTitle: "Default title",
			itemMaker: "Default maker",
			imgUrl: "img/thumbnail.jpg"
		}
		
	});

});