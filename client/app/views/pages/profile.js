define(function(require){

	var
	$              = require( "jquery" ),
	Handlebars     = require( "handlebars" ),

	BasePageView   = require( "views/pages/basepageview" ),
	Wall           = require( "views/wall/wall" ),
	Photos         = require( "views/photos/photos" ),
	Items          = require( "views/items/items" ),
	ProfileSidebar = require( "views/sidebar/profilesidebar" ),
	pageTemplate   = require( "text!templates/pages/profile.hbr" );


	return BasePageView.extend({

		template: Handlebars.compile( pageTemplate ),

		pageId: "profile",

		sidebar: new ProfileSidebar(),

		tabs: {
			wall: new Wall(),
			photos:	new Photos(),
			items: new Items()
		},

		myProfile: null,

		customHandle: function( pageState ){
			if( pageState.myProfile === false ){
				this.myProfile = false;
				this.getUser( pageState );
			} else {
				this.myProfile = true;
				this.loadPage( pageState );
			}
		},

		getUser: function( pageState ){
			$.ajax({
				type: "GET",
				context: this,
				dataType: "JSON",
				url: App.url( 'user' ) + "/" + pageState.user,

				success: function( data, textStatus, jqXHR ){
					App.data.profile = data;
					console.log( data );
					this.loadPage( pageState );
				},

				error: function( jqXHR, textStatus, errorThrown ){
					if( jqXHR.status === 401 ){
						alert( "Incorrect login credentials. Please try again!" );
					} else{
						alert( "profile getUser: " + jqXHR.status + ": " + errorThrown  );
					}
				}

			});
		}



	});

});