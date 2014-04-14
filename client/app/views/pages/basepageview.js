define(function(require){

	var
	Backbone       = require("backbone"),
	Handlebars     = require("handlebars"),
	$              = require("jquery"),
	Helper         = require('helper'),
	
	MasterBaseView = require('views/masterbaseview');

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
			App.vent.on( "page:" + this.pageId, this.handle, this );
			App.pages[ this.pageId ] = this;
		},

		handle: function( pageState ){
			if( typeof this.customHandle !== "undefined" ){
				this.customHandle( pageState );
			} else {
				this.loadPage( pageState );
			}
		},

		loadPage: function( pageState ){
			if( this.loadSidebar ) this.loadSidebar();
			if( this.loadTabs ) this.loadTabs();
			if( typeof pageState.tab !== "undefined" ) this.activeTab = pageState.tab;
			this.render( pageState );
			Helper.navState( this.pageId, this.activeTab );
		},

		render: function( pageState ){

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

		data: function(){
			var data = App.data[ this.options.data ];
			if( data.id === App.userId ) data.myprofile = true;
			return data;
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