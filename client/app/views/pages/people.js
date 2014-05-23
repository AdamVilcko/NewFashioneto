define(function(require){

	var

	$            = require("jquery"),
	Backbone     = require("backbone"),
	Handlebars   = require("handlebars"),
	Masonry      = require("jquery.masonry"),
	Imagesloaded = require("jquery.imageloaded"),

	People       = require("views/people/people"),
	BasePageView = require("views/pages/basepageview"),
	pageTemplate = require("text!templates/pages/people.hbr");


	return BasePageView.extend({

		template: Handlebars.compile( pageTemplate ),

		pageId: "people",

		url: App.api.get( "people" ),

		initSubviews: function(){
			this.people = new People();
			this.people.collection.on( "sync", function(){
				this.render();
				this.$("#tabContainer")
				.html( this.people.renderCollection().el );
				this.people.masonry( ".people" );
			}, this );
		},

		loadData: function(){
			this.people.collection.fetch();
		}



	});

});