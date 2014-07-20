define(function(require){

	var
	$                  = require( "jquery" ),
	Handlebars         = require( "handlebars" ),
	Helper             = require( "helper" ),

	BasePageView       = require( "views/pages/basepageview" ),
	Wall               = require( "views/wall/wall" ),
	Photos           = require( "views/photos/album-wrapper" ),
	ItemsTab           = require( "views/items/itemsTab" ),
	People             = require( "views/people/people" ),
	FollowersFollowing = require( "views/people/followersfollowing" ),
	ProfileSidebar     = require( "views/sidebar/profilesidebar" ),
	pageTemplate       = require( "text!templates/pages/profile.hbr" );


	return BasePageView.extend({

		template: Handlebars.compile( pageTemplate ),

		pageId: "profile",

		url: App.api.get( "user" ),

		myProfile: null,

		loadSidebar: function(){
			this.sidebar = new ProfileSidebar();
		},

		loadTabs: function() {
			this.tabs           = {};
			this.tabs.wall      = new Wall(),
			this.tabs.photos    = new Photos(),
			this.tabs.items     = new ItemsTab(),
			this.tabs.followers = new FollowersFollowing( { type: "followersWrapper" } ),
			this.tabs.following = new FollowersFollowing( { type: "followingWrapper" } )
		},

		handler: function( requestState ){
			if( typeof requestState.tab !== "undefined" ) this.activeTab = requestState.tab;
			this.myProfile = requestState.myProfile;
			if( this.myProfile ){
				this.url = App.api.get( "user" );
			} else {
				this.url = App.api.get( "user" ) + "/" + requestState.user;
			}
			this.loadData();
		},

		loadData: function(){
			$.ajax({
				type: "GET",
				context: this,
				dataType: "JSON",
				url: this.url,
				beforeSend: this.beforeSend,
				success: this.success,
				error: this.error
			});
		},

		success: function( data, textStatus, jqXHR ){
			this.data = data;
			this.model = new MasterBaseModel( data );
           //Create an object literal container modeal + collections for every profile tab
            /*var data = {
             board:
             };*/
			App.vent.trigger( "profile:dataLoaded", this.model );
			this.renderPage();
		},

		error: function( jqXHR, textStatus, errorThrown ){
			if( jqXHR.status === 401 ){
				alert( "Incorrect login credentials. Please try again!" );
			} else{
				alert( "profile getUser: " + jqXHR.status + ": " + errorThrown  );
			}
		},

		renderPage: function(){
			if( typeof this.preRender !== "undefined" ) this.preRender();

			var el = $( "<div></div>" );
			el
			.attr( "data-view", this.cid )
			.html( this.template( this.merge( this.data ) ) );

			if( this.sidebar ){
				el
				.find( this.nodes.sidebar )
				.html( this.sidebar.render().el );
			}

			if( typeof this.postRender !== "undefined" ) this.postRender();

			$('html body').scrollTop(0);
			this.$el.html( el );

			if( this.tabs ){
				this.tabs[ this.activeTab ].activate( this.el, this.model );
			}

			this.$el
			.removeClass( "loadOut" );

			Helper.navState();

			return this;

		}

	});

});