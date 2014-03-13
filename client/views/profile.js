define(function(require){
	
	var

	//Deps

	$            = require("jquery"),
	Backbone     = require("backbone"),
	Handlebars   = require("handlebars"),	
	Helper       = require('helper'),
	
	//Base page view
	
	BasePageView = require("views/basepageview"),
	TabWrapper   = require("views/tabwrapper"),
	
	//Tab views
	
	Wall         = require("views/wall/wall.js"),
	Photos       = require("views/photos/photos.js"),
	Items        = require("views/items/items.js"),
	
	//Main profile template
	
	template     = require("text!templates/pages/profile.hbr");
	

	return BasePageView.extend({

		pageId: "profile",
		
		events:{
			"click .nav-tabs a" : "clickState"
		},

		template: Handlebars.compile( template ),

		initialize: function( options ){
			this.options = options || {};			
			App.vent.on( "page:profile", this.render, this );
			App.vent.on( "page:" + this.pageId, this.tabTo, this );
			console.log( "page:" + this.pageId );
		},

		render: function( evData ){
			this.$el
			.html( this.template() )
			.find( "#tabContainer" )
			.html( this.tabs[ this.activeTab ].render().el );
		},

		clickState: function( ev ){
			Helper.clickState( ".nav-tabs a", ev );
		},

		tabs: {
			wall: new Wall(),
			photos:	new Photos(),
			items: new Items()
		},

		tabTo: function( data ){
			console.log( data );
			this.$el
			.find( "#tabContainer" )
			.html( this.tabs[ data.tab ].render() );
			this.render();
		},

		activeTab: "items" // needs to be dafault tab

	});

});

