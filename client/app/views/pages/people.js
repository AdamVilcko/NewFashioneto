define(function(require){

	var

	$            = require("jquery"),
	Backbone     = require("backbone"),
	Handlebars   = require("handlebars"),
	Masonry      = require("jquery.masonry"),
	Imagesloaded = require("jquery.imageloaded"),
	Helper               = require( 'helper' ),

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
				Helper.loader( "#tabContainer", this.$el );
				$('html body').scrollTop(0);
				this.render();
				this.$("#tabContainer")
				.html( this.people.renderNewItems() );
				this.people.masonry( ".people" );
			}, this );
		},

		loadData: function(){
			this.people.collection.fetch();
		}

	});

});