define(function(require){

	var

	$               = require("jquery"),
	Handlebars      = require("handlebars"),
	Helper          = require( 'helper' ),



	BasePageView    = require("views/pages/basepageview"),
	pageTemplate    = require("text!templates/pages/home.hbr");


	return BasePageView.extend({

		template: Handlebars.compile( pageTemplate ),

		pageId: "home",

		url: App.api.get( "people" ),

		initSubviews: function(){
			this.collection = new FeedCollection();
			this.collection.fetch();
		},

		loadData: function(){
			this.render();
		}

	});

});