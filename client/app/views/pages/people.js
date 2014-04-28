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

		url: App.url( "people" ),

		initSubviews: function(){
			this.people = new People();
			this.people.collection.on( "sync", this.loadComponents, this );
		},

		beforeSend: function(){
			this.people.collection.fetch();
			return false;
		},

		postRender: function(){
			var
			tabContainer = this.$el.find("#tabContainer");
			tabContainer.empty();
			tabContainer.html( this.people.renderCollection().el );
			tabContainer
			.addClass( "masonryContainer" )
			.masonry({
			  itemSelector: '.people',
			  gutterWidth: 25,
			  isFitWidth: true
			}).resize();			
		}

	});

});