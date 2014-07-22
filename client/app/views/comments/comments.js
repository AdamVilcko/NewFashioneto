define(function(require){

	var

	Handlebars         = require("handlebars"),
	Backbone           = require("backbone"),
	
	MasterBaseView     = require( 'views/masterbaseview' ),
	CommentView        = require("views/comments/comment"),
	CommentsCollection = require("collections/comments/comments"),
	
	showAll            = require("text!templates/comments/showall.hbr"),
	input              = require("text!templates/comments/input.hbr");


	return MasterBaseView.extend({
		modelView: CommentView,
		templates:{
			showAll: Handlebars.compile( showAll ),
			input: Handlebars.compile( input )
		},
		emptyCollectionTemplate: Handlebars.compile( "" ),
		nodes:{
			textarea : "textarea"
		},
		init: function(){
			if( this.options.data instanceof Backbone.collection.prototype ){
				this.collection = this.options.data;
			} else {
				this.collection = new CommentsCollection( this.options.data );
			}			
			this.collection
			.on( "sync", this.render, this );
		},

		render: function(){
			this.renderCollection( null, { contextId : this.options.contextId } );
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
			this.collection.create( { content: content });
		},

		bindData: function( model ){
			this.model = model;
			this.collection.reset( model.get("commentsWrapper").collection );
			this.renderToDom();
		}

	});

});