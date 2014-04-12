define(function(require){

	var
	Backbone   = require("backbone"),
	Handlebars = require("handlebars"),
	$          = require("jquery"),

	BasePageView = require("views/pages/basepageview"),
	pageTemplate = require("text!templates/pages/people.hbr");

	return BasePageView.extend({

		template: Handlebars.compile( pageTemplate ),

		pageId: "people",

		postRender: function(){

			this.$el.find("#tabContainer")
			.addClass( "masonryContainer" )
			.masonry({
			  itemSelector: '.people',
			  columnWidth: 160
			});
		}

	});

});