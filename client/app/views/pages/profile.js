define(function(require){

	var
	$                  = require( "jquery" ),
	Handlebars         = require( "handlebars" ),
	Helper             = require( "helper" ),

	MasterBaseModel = require("models/masterbasemodel"),

	//Views

	BasePageView       = require( "views/pages/basepageview" ),
	Wall               = require( "views/wall/wall" ),
	Photos             = require( "views/photos/album-wrapper" ),
	ItemsTab           = require( "views/items/itemsTab" ),
	People             = require( "views/people/people" ),
	FollowersFollowing = require( "views/people/followersfollowing" ),
	ProfileSidebar     = require( "views/sidebar/profilesidebar" ),
	pageTemplate       = require( "text!templates/pages/profile.hbr" ),

	//Collections
	CommentsCollection = require("collections/comments/comments");


	return BasePageView.extend({
		template: Handlebars.compile( pageTemplate ),
		pageId: "profile",
		url: App.api.get( "user" ),
		myProfile: null,

		handler: function( requestState ){
			this.myProfile = requestState.myProfile;

			if( typeof requestState.tab !== "undefined" ) {
				this.activeTab = requestState.tab;
			}

			if( this.myProfile ){
				this.url = App.api.get( "user" );
			} else {
				this.url = App.api.get( "user" ) + "/" + requestState.user;
			}

			$.ajax({
				type: "GET",
				context: this,
				dataType: "JSON",
				url: this.url,
				beforeSend: this.beforeSend,
				success: this.success,
				error: function(){ App.router.navigate( "logout", { trigger: true } ); }
			});
		},

		success: function( data, textStatus, jqXHR ){
			this.model = new MasterBaseModel(data);

			this.tabs = {
				wall      : new Wall( { data: this.model } ),
				photos    : new Photos( { data: this.model } ),
				items     : new ItemsTab( { data: this.model } ),
				followers : new FollowersFollowing( { data: this.model, type: "followersWrapper" } ),
				following : new FollowersFollowing( { data: this.model, type: "followingWrapper" } )
			};

			this.sidebar = new ProfileSidebar( { data: this.model } );

			App.vent.trigger( "profile:dataLoaded", this.model );

			this.render();
		},

		postRender:function(){
			if( this.sidebar ){
				this.$( this.nodes.sidebar )
				.html( this.sidebar.render().el );
			}

			if( this.tabs ){
				this.tabs[ this.activeTab ].activate( this.el, this.model );
			}

			Helper.navState();
		}
	});

});