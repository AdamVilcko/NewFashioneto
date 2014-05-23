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
		},

		handler: function( state ){
			this.state = state;
			this.loadComponents();
		},

		loadComponents: function(){
			if( ! this.sidebar && this.loadSidebar  ) this.loadSidebar();
			if( ! this.loadTabs && this.loadTabs ) this.loadTabs();
			if( typeof this.state.tab !== "undefined" ) this.activeTab = this.state.tab;
			this.loadData();
			Helper.navState( this.pageId, this.activeTab );
		},

		loadData: function(){
			this.render();
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