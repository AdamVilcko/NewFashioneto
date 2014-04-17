define(function(require){

	var	BaseProfile = require( "views/pages/baseprofile" );
	
	return BaseProfile.extend({
		pageId: "guestprofile",
		myProfile: false,

		preRender: function(){
			$("#main").css( { "opacity" : 0, "margin-left" : "-20px" } );
		},

		postRender: function(){
			$("#main").animate( { opacity : 1, "margin-left" : "0px" }, 1000 );
		}

	});

});