define(function(require){

	var
	$              = require( "jquery" ),
	Handlebars     = require( "handlebars" ),
	Helper         = require( "helper" ),

	BasePageView   = require( "views/pages/basepageview" ),
	Wall           = require( "views/wall/wall" ),
	Photos         = require( "views/photos/photos" ),
	Items          = require( "views/items/items" ),
	People         = require( "views/people/people" ),
	Followers      = require( "views/people/followersfollowing" ),
	ProfileSidebar = require( "views/sidebar/profilesidebar" ),
	pageTemplate   = require( "text!templates/pages/profile.hbr" );


	return BasePageView.extend({

		template: Handlebars.compile( pageTemplate ),

		pageId: "profile",

		url: App.api.get( "user" ),

		myProfile: null,

		loadSidebar: function(){
			this.sidebar = new ProfileSidebar( { master: this } );
		},

		loadTabs: function() {
			this.tabs           = {};
			this.tabs.wall      = new Wall( { master: this } ),
			this.tabs.photos    = new Photos( { master: this } ),
			this.tabs.items     = new Items( { master: this } ),
			this.tabs.followers = new Followers( { master: this } ),
			this.tabs.following = new People( { master: this } )
		},

		handle: function( pageState ){
			if( pageState.myProfile === false ){
				this.myProfile = false;
			} else {
				this.myProfile = true;
				pageState.user = App.data.myprofile.details.userName
			}
			this.getData( pageState );
		}

	});

});