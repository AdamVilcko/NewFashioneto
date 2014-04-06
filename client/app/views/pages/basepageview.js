define(function(require){

	var
	Backbone           = require("backbone"),
	Handlebars         = require("handlebars"),
	$                  = require("jquery"),
	Helper             = require('helper'),

	MasterBasePageView = require('views/masterbaseview');

	return MasterBasePageView.extend({

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
			App.vent.on( "page:" + this.pageId, this.handle, this );
		},

		handle: function( pageState ){
			if( typeof this.customHandle !== "undefined" ){
				this.customHandle( pageState );
			} else {
				this.loadPage( pageState );
			}
		},

		loadPage: function( pageState ){
			if( typeof pageState.tab !== "undefined" ) this.activeTab = pageState.tab;
			this.render( pageState );
			Helper.navState( this.pageId, this.activeTab );
		},

		render: function(){

			if( typeof this.preRender !== "undefined" ) this.preRender( pageState );

			this.$el
			.html( this.template( App.data[ this.pageId ] ) );

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

			if( typeof this.postRender !== "undefined" ) this.postRender( pageState );

			return this;

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