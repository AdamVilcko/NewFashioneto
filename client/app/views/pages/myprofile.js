define(function(require){

	var	BaseProfile = require( "views/pages/baseprofile" );
	
	return BaseProfile.extend({
		pageId: "myprofile",
		myProfile: true
	});

});