define(function(require){

	var
	Backbone            = require("backbone"),
	Handlebars          = require("handlebars"),
	$                   = require("jquery"),	
	
	CommentView         = require("views/comments/comment.js"),
	CommentsCollection  = require("collections/comments/comments.js"),
	
	showAll             = require("text!templates/comments/showall.hbr"),
	input               = require("text!templates/comments/input.hbr"),
	
	mockColllectionData = require("mock/comments/mockcommentscollection");


	return Backbone.View.extend({

		initialize: function( options ){
			this.options = options || {};
			this.collection = new CommentsCollection( this.options.data );
		},

		templates:{
			showAll: Handlebars.compile( showAll ),
			input: Handlebars.compile( input )
		},

		render: function(){

			//Show all comments
			this.$el.html( this.templates.showAll() );

			//Each through posts
			this.collection.each( this.renderComments, this );

			//Input
			this.$el.append( this.templates.input() );
			
			return this;
		},

		renderComments: function( comment ){
			var commentView = new CommentView( { model: comment } );
			this.$el.append( commentView.render().el );
		}
		
	});

});