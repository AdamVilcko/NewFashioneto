define(function(require){
	
	var

	//Deps

	Backbone     = require("backbone"),
	Handlebars   = require("handlebars"),
	$            = require("jquery"),
	Helper       = require('helper'),
	
	//Base page view

	BasePageView = require("views/basepageview"),
	TabWrapper   = require("views/tabwrapper"),
	
	
	//Tab views

	Items        = require("views/items/items"),

	//Main items template

	template     = require("text!templates/pages/items.hbr");


	return BasePageView.extend({

		pageId: "items",

		initialize: function(options){
			this.options = options || {};
			App.vent.on( "page:items", this.render, this );	
			
			//Register render chain
			App.renderChain[ this.pageId ].push( this );
		},
		

		template: Handlebars.compile( template ),

		render: function( evData ){
			this.renderChain( evData );
			this.instantiateTabs();
		},

		instantiateTabs: function(){
			if( ! this.tabs ){
				this.tabs = [
					new TabWrapper({ tab: new Items(), pageId:this.pageId, tabId: "explore", default: true }),
					new TabWrapper({ tab: new Items(), pageId:this.pageId, tabId: "search" })				
				];				
			this.renderChain( { pageName: this.pageId } );
			}

		}

	});

});