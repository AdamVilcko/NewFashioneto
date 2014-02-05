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
		
		events:{
			"click .nav-tabs a" : "clickState"
		},

		template: Handlebars.compile( template ),

		initialize: function( options ){
			this.options = options || {};
			this.render();
			App.vent.on( "page:profile", this.render, this );			
			this.instantiateTabs();
		},

		render: function( tab ){
			if( typeof( tab ) === "undefined" ){
				this.$el.html( this.template() );
			}
		},

		clickState: function( ev ){
			Helper.clickState( ".nav-tabs a", ev );			
		},

		instantiateTabs: function(){
			this.tabs = [
				new TabWrapper({ tab: new Wall(), hashId: "wall" }),
				new TabWrapper({ tab: new Photos(), hashId: "photos" }),
				new TabWrapper({ tab: new Items(), hashId: "items" })
			];
		}

	});

});