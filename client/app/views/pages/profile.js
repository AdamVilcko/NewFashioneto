define(function(require){
	
	var	
	$              = require( "jquery" ),
	Backbone       = require( "backbone" ),
	Handlebars     = require( "handlebars" ),
	Helper         = require( 'helper' ),
	
	BasePageView   = require( "views/pages/basepageview" ),
	Wall           = require( "views/wall/wall.js" ),
	Photos         = require( "views/photos/photos.js" ),
	Items          = require( "views/items/items.js" ),
	ProfileSidebar = require( "views/sidebar/profilesidebar" ),
	pageTemplate   = require( "text!templates/pages/profile.hbr" );
	

	return BasePageView.extend({

		template: Handlebars.compile( pageTemplate ),

		pageId: "profile",

		initialize: function( options ){
			this.options = options || {};	
			this.init( options );
		},

		sidebar: new ProfileSidebar(),

		tabs: {
			wall: new Wall(),
			photos:	new Photos(),
			items: new Items()
		}

	});

});