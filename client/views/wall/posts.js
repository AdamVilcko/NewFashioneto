define(function(require){

	var
	Backbone        = require("backbone"),
	Handlebars      = require("handlebars"),
	$               = require("jquery"),	
	
	PostView        = require("views/wall/post.js"),
	PostsCollection = require("collections/wall/posts.js"),
	mockColllectionData = require("mock/wall/mockpostscollection");


	return Backbone.View.extend({

		initialize: function(){
			this.collection = new PostsCollection( mockColllectionData );
		},

		render: function(){
			this.$el.empty();
			this.collection.each( this.renderPosts, this );
			return this;
		},

		renderPosts: function( post ){
			var postView = new PostView( { model: post } );
			this.$el.append( postView.render().el );
		}
		
	});

});