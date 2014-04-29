define(function(require){

	var	BaseProfile = require( "views/pages/baseprofile" );

	return BaseProfile.extend({
		pageId: "guestprofile",
		myProfile: false,

		beforeSend: function( jqXHR, settings ){
			settings.url = settings.url + "/" + this.state.user
		}

	});

});