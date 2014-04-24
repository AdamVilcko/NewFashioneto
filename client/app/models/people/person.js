define(function(require){

	var
	Backbone        = require("backbone"),
	
	MasterBaseModel = require( "models/masterbasemodel" );

	return MasterBaseModel.extend({

		defaults: {
			id: 1,
			userName: "user1",
			displayName: "Emma Davis",
			location: "London, UK",
			imgUrl: "img/pictures-thumbnail.jpg"
		}
		
	});

});