define(function(require){

	var

	MasterBaseModel = require( "models/masterbasemodel" );

	return MasterBaseModel.extend({
		url: App.api.get( 'signup' ),
		success: function( data, textStatus, jqXHR ){
			$.cookie( "fashioneto", data.token, {
				expires : 10
			});
			$.ajaxSetup({
				headers: { 'X-Auth-Token': data.token }
			});

			//Gonna get Felipe to refactor so details and id are returned only <- I know, let's refactor it once we get together
			
			data.user.details.id = data.user.id;
			App.user = new User( data.user.details );
			this.proceed( data.user );
		},

		error: function( jqXHR, textStatus, errorThrown ){
			alert( "Error response: " + jqXHR.status + ": " + errorThrown  );
		}
	});

});