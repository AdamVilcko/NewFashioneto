define(function(require){
	
	var
	
	//Deps
	
	Backbone     = require("backbone"),
	Handlebars   = require("handlebars"),
	$            = require("jquery"),	
	Masonry      = require("jquery.masonry"),
	
	
	//Base page view
	
	BasePageView = require("views/basepageview"),
	
	//Tab views
	
	Items        = require("views/items/items"),
	
	//Main items template 
	
	pageTemplate = require("text!templates/pages/items.hbr");



	return BasePageView.extend({

		template: Handlebars.compile( pageTemplate ),

		pageId: "items",

		initialize: function( options ){
			this.options = options || {};
			this.init( options );
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