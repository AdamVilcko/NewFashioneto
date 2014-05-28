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
				this.$el.addClass( "loadOut" );
				var self = this;
				setTimeout( function(){
					$('html body').scrollTop(0);
					self.render();
					self.$el
					.addClass( "loadIn" )
					.removeClass( "loadOut" );
					self.$("#tabContainer")
					.html( self.people.renderCollection().el );
					self.people.masonry( ".people" );
				}, 300 );
			}, this );
		},

		loadData: function(){
			this.people.collection.fetch();
		}



	});

});