define(function(require){

	var Backbone = require("backbone"),

	MasterBaseModel = require( "models/masterbasemodel" );

	return MasterBaseModel.extend({
		url: App.url( "follow" )
	});

});