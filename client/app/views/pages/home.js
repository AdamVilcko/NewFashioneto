define(function(require){

	var

	$               = require("jquery"),
	Handlebars      = require("handlebars"),
	Helper          = require( 'helper' ),

	ItemsCollection = require( "collections/items/items" ),
	MetaCollection  = require( "collections/items/meta" ),

	BasePageView    = require("views/pages/basepageview"),
	pageTemplate    = require("text!templates/pages/home.hbr");


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