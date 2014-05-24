define(function(require){

	var
	Backbone        = require("backbone"),
	Handlebars      = require("handlebars"),
	$               = require("jquery"),
	
	MasterBaseView  = require( 'views/masterbaseview' ),
	PostView        = require("views/wall/post"),
	PostsCollection = require("collections/wall/posts");


	return MasterBaseView.extend({

		init: function(){
			this.collection = new PostsCollection();
			this.collection
			.on( "sync", this.render, this );
		},

		render: function(){
			this.$el.empty();
			if( ! this.collection.isEmpty() ){
				this.collection.sort().each( this.renderPost, this );
			} else {
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