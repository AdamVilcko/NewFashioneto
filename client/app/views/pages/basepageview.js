define(function(require){

	var
	
	$              = require("jquery"),
	Backbone       = require("backbone"),
	Handlebars     = require("handlebars"),
	Helper         = require('helper'),

	MasterBaseView = require('views/masterbaseview'),
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
			App.vent.on( "page:" + this.pageId, this.getData, this );
		},

		getData: function( state ){
			this.state = state;
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

		beforeSend: function(){

		},

		success: function( data, textStatus, jqXHR ){
			this.data = data;
			this.model = new MasterBaseModel( data );
			this.loadComponents();
		},

		error: function( jqXHR, textStatus, errorThrown ){
			if( jqXHR.status === 401 ){
				alert( "Incorrect login credentials. Please try again!" );
			} else{
				alert( "profile getUser: " + jqXHR.status + ": " + errorThrown  );
			}
		},

		loadComponents: function(){
			if( this.loadSidebar ) this.loadSidebar();
			if( this.loadTabs ) this.loadTabs();
			if( typeof this.state.tab !== "undefined" ) this.activeTab = this.state.tab;
			this.render();
			Helper.navState( this.pageId, this.activeTab );
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