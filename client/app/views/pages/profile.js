define(function(require){

	var
	$              = require( "jquery" ),
	Handlebars     = require( "handlebars" ),
	Helper         = require( "helper" ),

	BasePageView       = require( "views/pages/basepageview" ),
	Wall               = require( "views/wall/wall" ),
	Photos             = require( "views/photos/photos" ),
	ItemsTab              = require( "views/items/itemsTab" ),
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
			this.sidebar = new ProfileSidebar( { master: this } );
		},

		loadTabs: function() {
			this.tabs           = {};
			this.tabs.wall      = new Wall( { master: this } ),
			this.tabs.photos    = new Photos( { master: this } ),
			this.tabs.items     = new ItemsTab( { master: this } ),
			this.tabs.followers = new FollowersFollowing( { master: this, type: "followersWrapper" } ),
			this.tabs.following = new FollowersFollowing( { master: this, type: "followingWrapper" } )
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
			var self = this;

			if( typeof this.preRender !== "undefined" ) this.preRender();

			this.$el.addClass( "loadOut" );

			var el = $( "<div></div>" );

			el
			.attr( "data-view", self.cid ) //Needs to be here as the el is shared
			.html( self.template( self.merge( self.data ) ) );

			if( self.sidebar ){
				el
				.find( self.nodes.sidebar )
				.html( self.sidebar.render().el );
			}

			if( typeof self.postRender !== "undefined" ) self.postRender();



			setTimeout( function(){
$('html body').scrollTop(0);
				self.$el.html( el );

				if( self.tabs ){
					self.tabs[ self.activeTab ].activate( self.el );
				}

				self.$el
				.addClass( "loadIn" )
				.removeClass( "loadOut" );

				Helper.navState();

			}, 300 );


			return this;

		},

	});

});