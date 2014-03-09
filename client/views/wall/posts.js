define(function(require){

	var
	Backbone           = require("backbone"),
	Handlebars         = require("handlebars"),
	$                  = require("jquery"),	
	
	PostView           = require("views/wall/post.js"),
	PostsCollection    = require("collections/wall/posts.js"),
	mockCollectionData = require("mock/wall/mockpostscollection");


	return Backbone.View.extend({

		initialize: function(){
			this.collection = new PostsCollection();
			this.collection
			.bind( "reset", this.render, this )
			.fetch(); 
			App.test = this.collection;
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