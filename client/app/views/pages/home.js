define(function(require){

	var

	$            = require("jquery"),
	Backbone     = require("backbone"),
	Handlebars   = require("handlebars"),
	Masonry      = require("jquery.masonry"),
	Imagesloaded = require("jquery.imageloaded"),
	Helper       = require( 'helper' ),

	BasePageView = require("views/pages/basepageview"),
	pageTemplate = require("text!templates/pages/home.hbr");


	return BasePageView.extend({

		template: Handlebars.compile( pageTemplate ),

		pageId: "home",

		url: App.api.get( "people" ),

		initSubviews: function(){

		},

		loadData: function(){
			this.render();
		}

	});

});