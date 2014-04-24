define(function(require){

	var Backbone = require("backbone"),

	MasterBaseModel = require( "models/masterbasemodel" );

	return MasterBaseModel.extend({

		defaults: {
			id: 1,
			itemTitle: "Default title",
			itemMaker: "Default maker",
			imgUrl: "img/thumbnail.jpg"
		}
		
	});

});