define(function(require){

	var
	Backbone     = require("backbone"),
	Handlebars   = require("handlebars"),
	$            = require("jquery"),
	Imagesloaded = require("jquery.imageloaded"),

	People = require("views/people/people"),
	
	BasePageView = require("views/pages/basepageview"),
	pageTemplate = require("text!templates/pages/people.hbr");

	return BasePageView.extend({

		template: Handlebars.compile( pageTemplate ),

		pageId: "people",

		url: App.url( "people" ),

		initSubviews: function(){
			this.people = new People();
		},

		preRender: function(){
			
		},

		postRender: function(){

			var tabContainer = this.$el.find("#tabContainer");

			tabContainer.empty();

			tabContainer
				.addClass( "masonryContainer" )
				.masonry({
				  itemSelector: '.people',
				  gutterWidth: 25,
				  isFitWidth: true
				}).resize();



			tabContainer.masonryImagesReveal( this.people.render().$el );

		tabContainer.resize();


			
		}

	});

});