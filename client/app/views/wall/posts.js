define(function(require){

	var
	Backbone           = require("backbone"),
	Handlebars         = require("handlebars"),
	$                  = require("jquery"),

	PostView           = require("views/wall/post"),
	PostsCollection    = require("collections/wall/posts");


	return Backbone.View.extend({

		initialize: function(){
			this.collection = new PostsCollection();
			this.collection
			.on( "replace reset add remove", this.render, this )
			.fetch();
		},

		render: function(){
			this.$el.empty();
			this.collection.each( this.renderPost, this );
			return this;
		},

		renderPost: function( post ){
			var postView = new PostView( { model: post } );
			this.$el.append( postView.render().el );
		}

	});

});