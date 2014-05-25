define(function(require){

	var

	$               = require("jquery"),
	Backbone        = require("backbone"),
	Handlebars      = require("handlebars"),
	Helper          = require('helper'),

	MasterBaseView  = require('views/masterbaseview'),
	MasterBaseModel = require('models/masterbasemodel');


	return MasterBaseView.extend({

		el:"#main",
		nodes:{
			tabContainer: "#tabContainer",
			sidebar: "#sidebar"
		},
		pageId: "default",
		active: null,
		tabs: null,
		activeTab: "wall",

		init: function(){
			App.vent.on( "page:" + this.pageId, this.handler, this );
			if( this.loadSidebar ) this.loadSidebar();
			if( this.loadTabs ) this.loadTabs();
		},

		handler: function( requestState ){
			this.state = requestState;
			this.loadComponents();
		},

		loadComponents: function(){
			if( typeof this.state.tab !== "undefined" ) this.activeTab = this.state.tab;
			Helper.navState( this.pageId, this.activeTab );
			if( this.loadData ){
				this.loadData();
			} else {
				this.render();
			}
		},

		tabTo: function( data ){
			this.$el
			.find( this.nodes.tabContainer )
			.html( this.tabs[ data.tab ].render().el );
		},


		//DOM events


		events:{
			"click .nav-tabs a" : "clickState"
		},

		clickState: function( ev ){
			ev.stopPropagation();
		}

	});

});