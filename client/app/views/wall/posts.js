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
			.on( "replace add remove", this.render, this );
		},

		render: function(){
			console.log( this.collection.toJSON() );
			this.$el.empty();
			if( this.collection.length > 0 ){
				this.collection.each( this.renderPost, this );
			} else {
				//Render no comments template
				this.$el.html( "<h1 style='text-align:center'>This user has no posts yet</h1>" );
			}			

			return this;
			
		},

		renderPost: function( post ){
			var postView = new PostView( { model: post } );
			this.$el.append( postView.render().el );
		}

	});

});