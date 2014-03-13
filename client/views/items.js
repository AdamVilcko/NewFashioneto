define(function(require){
	
	var
	
	//Deps
	
	Backbone     = require("backbone"),
	Handlebars   = require("handlebars"),
	$            = require("jquery"),
	Maso
	Helper       = require('helper'),
	Masonry      = require("jquery.masonry"),
	
	
	//Base page view
	
	BasePageView = require("views/basepageview"),
	TabWrapper   = require("views/tabwrapper"),
	
	
	//Tab views
	
	Items        = require("views/items/items"),
	
	//Main items template
	
	template     = require("text!templates/pages/items.hbr");



	return BasePageView.extend({

		pageId: "items",

		template: Handlebars.compile( template ),

		initialize: function(options){
			this.options = options || {};
			this.instantiateTabs();
			App.vent.on( "page:items", this.render, this );							
		},		

		render: function( evData ){
			this.$el.html( this.template() );
			return this;
			
			

			//NEEDS REFACTORING - CAN'T RELY ON TIMEOUT


			/*var that = this;
			setTimeout( that.invokeMasonry, 100 );*/
		},

		instantiateTabs: function(){			
			/*this.tabs = [
				new TabWrapper({ tab: new Items(), pageId:this.pageId, tabId: "explore", default: true }),
				new TabWrapper({ tab: new Items(), pageId:this.pageId, tabId: "search" })				
			];*/
		},

		invokeMasonry: function(){

			//NEEDS REFACTORING - NEEDS TO USE EL AND OPTNIOS NEED OPTIMISING


			var $container = $('#tabContainer');
			// initialize
			$container.masonry({
			  columnWidth: 60,
			  itemSelector: '.item',
			  "gutter": 20,
			  isFitWidth: true
			});
		}

	});

});