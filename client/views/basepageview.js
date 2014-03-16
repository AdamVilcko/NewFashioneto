define(function(require){
	
	var
	Backbone   = require("backbone"),
	Handlebars = require("handlebars"),
	$          = require("jquery"),
	Helper     = require('helper');

	return Backbone.View.extend({

		el:"#main",
		nodes:{
			tabContainer: "#tabContainer"
		},
		pageId: "default",
		active: null,
		tabs: null,
		activeTab: "wall",

		init: function(){
			App.vent.on( "page:" + this.pageId, this.render, this );
		},

		render: function( tab ){

			if( tab ){
				this.activeTab = tab;
			}			

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
			console.log( "Hello" );
			Helper.clickState( ".nav-tabs a", ev );
		}		

	});

});