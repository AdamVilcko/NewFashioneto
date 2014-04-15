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

		myProfile: null,

		loadSidebar: function(){
			this.sidebar = new ProfileSidebar( { master: this } );
		},		

		loadTabs: function() {
			this.tabs        = {};
			this.tabs.wall   = new Wall( { master: this } ),
			this.tabs.photos = new Photos( { master: this } ),
			this.tabs.items  = new Items( { master: this } )
		},		

		customHandle: function( pageState ){
			if( pageState.myProfile === false ){
				this.myProfile = false;				
			} else {
				this.myProfile = true;
				pageState.user = App.data.myprofile.details.userName
			}
			this.getUser( pageState );
		},

		getUser: function( pageState ){
			$.ajax({
				type: "GET",
				context: this,
				dataType: "JSON",
				url: App.url( 'user' ) + "/" + pageState.user,

				success: function( data, textStatus, jqXHR ){
					if( data.id === App.data.myprofile.id ){
						App.data.myprofile = data;
					} else {
						App.data.guestprofile = data;
					}					
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