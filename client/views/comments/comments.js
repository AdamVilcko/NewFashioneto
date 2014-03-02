define(function(require){

	var
	Backbone            = require("backbone"),
	Handlebars          = require("handlebars"),
	$                   = require("jquery"),	
	
	CommentView         = require("views/comments/comment.js"),
	CommentsCollection  = require("collections/comments/comments.js"),
	mockColllectionData = require("mock/comments/mockcommentscollection");


	return Backbone.View.extend({

		initialize: function( options ){
			this.options = options || {};
			this.collection = new CommentsCollection( this.options.data );
		},

		render: function(){
			this.$el.empty();
			this.collection.each( this.renderComments, this );
			return this;
		},

		renderComments: function( comment ){
			var commentView = new CommentView( { model: comment } );
			this.$el.append( commentView.render().el );
		}
		
	});

});