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

		handler: function( requestState ){
			this.state = requestState;
			if( requestState.myProfile === this.myProfile ){
				this.loadComponents();
			}
		},

		loadData: function(){
			$.ajax({
				type: "GET",
				context: this,
				dataType: "JSON",
				url: this.url,
				beforeSend:this.beforeSend,
				success: this.success,
				error: this.error
			});
		},

		success: function( data, textStatus, jqXHR ){
			this.data = data;
			this.model = new MasterBaseModel( data );
			App.vent.trigger( "profile:dataLoaded", this.model );
			this.render();
		},

		error: function( jqXHR, textStatus, errorThrown ){
			if( jqXHR.status === 401 ){
				alert( "Incorrect login credentials. Please try again!" );
			} else{
				alert( "profile getUser: " + jqXHR.status + ": " + errorThrown  );
			}
		},

		render: function(){

			if( typeof this.preRender !== "undefined" ) this.preRender();

			this.$el
			.attr( "data-view", this.cid ) //Needs to be here as the el is shared
			.html( this.template( this.merge( this.data ) ) );

			if( this.tabs ){
				this.$el
				.find( this.nodes.tabContainer )
				.html( this.tabs[ this.activeTab ].render().el );
			}

			if( this.sidebar ){
				this.$el
				.find( this.nodes.sidebar )
				.html( this.sidebar.render().el );
			}

			if( typeof this.postRender !== "undefined" ) this.postRender();

			return this;

		},

	});

});