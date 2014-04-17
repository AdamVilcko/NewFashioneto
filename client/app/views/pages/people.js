define(function(require){

	var
	Backbone     = require("backbone"),
	Handlebars   = require("handlebars"),
	$            = require("jquery"),

	People = require("views/people/people"),
	
	BasePageView = require("views/pages/basepageview"),
	pageTemplate = require("text!templates/pages/people.hbr");

	return BasePageView.extend({

		template: Handlebars.compile( pageTemplate ),

		pageId: "people",

		initSubviews: function(){
			this.people = new People();
		},

		postRender: function(){
			var tabContainer = this.$el.find("#tabContainer");

			tabContainer.empty();

			tabContainer.html( this.people.render().el );

			tabContainer
			.addClass( "masonryContainer" )
			.masonry({
			  itemSelector: '.people',
			  columnWidth: 160
			});
		}

	});

});