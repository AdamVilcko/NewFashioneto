define(function(require){
	
	var
	Backbone   = require("backbone"),
	Handlebars = require("handlebars"),
	$          = require("jquery"),
	Helper     = require('helper');

	return Backbone.View.extend({

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

		handle: function( tab ){
			if( tab ){
				this.activeTab = tab;
			}
			this.render();
			Helper.navState( this.pageId, this.activeTab );
		},

		render: function(){						

			if( typeof this.preRender !== "undefined" ){
				this.preRender();
			}

			this.$el
			.html( this.template() );

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

			if( typeof this.postRender !== "undefined" ){
				this.postRender();
			}

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