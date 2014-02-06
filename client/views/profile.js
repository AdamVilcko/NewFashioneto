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
			App.vent.on( "page:profile", this.render, this );
			
			//Register render chain
			App.renderChain.profile.push( this );
			
		},

		render: function( evData ){
			this.renderChain( evData );

			//Insantiate tab wrappers
			this.instantiateTabs();
		},

		clickState: function( ev ){
			Helper.clickState( ".nav-tabs a", ev );
		},

		instantiateTabs: function(){
			if( ! this.tabs ){
				this.tabs = [
					new TabWrapper({ tab: new Wall(), hashId: "wall" }),
					new TabWrapper({ tab: new Photos(), hashId: "photos" }),
					new TabWrapper({ tab: new Items(), hashId: "items" })
				];
			window.tabs = this.tabs;
			}
		}

	});

});

