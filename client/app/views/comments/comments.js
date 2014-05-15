define(function(require){

	var
	Backbone           = require("backbone"),
	Handlebars         = require("handlebars"),
	$                  = require("jquery"),
	
	MasterBaseView     = require( 'views/masterbaseview' ),
	CommentView        = require("views/comments/comment"),
	CommentsCollection = require("collections/comments/comments"),
	
	showAll            = require("text!templates/comments/showall.hbr"),
	input              = require("text!templates/comments/input.hbr");


	return MasterBaseView.extend({

		init: function(){
			this.collection = new CommentsCollection( this.options.data )
			this.collection
			.on( "sync", this.render, this );

		},

		ModelViewType: CommentView,

		templates:{
			showAll: Handlebars.compile( showAll ),
			input: Handlebars.compile( input )
		},

		nodes:{
			textarea : "textarea"
		},



		render: function(){

			//Show all comments
			this.$el.html( /*this.templates.showAll()*/ );

			//Each through posts
			this.collection.each( this.renderCollection, this );

			//Input
			this.$el.append( this.templates.input( this.merge() ) );

			return this;

		},

		events:{
			"click .sendComment" : "post"
		},

		post: function( ev ){
			var textarea = this.$el.find( this.nodes.textarea );
			content = textarea.val();
			textarea.val( "" );
			this.collection.create( { content: content },
			{
				url: this.collection.url + "/" + this.options.parentId
			} );
		}

	});

});