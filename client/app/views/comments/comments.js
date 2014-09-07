define(function(require){

	var

	Handlebars         = require("handlebars"),
	Backbone           = require("backbone"),
	MasterBaseView     = require("views/masterbaseview"),
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
			if( this.options.data instanceof Backbone.Collection ){
				this.collection = this.options.data;
			}
			else {
				this.collection = new CommentsCollection();
			}

			this.collection
			.setUrl( this.options )
			.on( "sync", this.render, this );

			if( this.options.el && !this.options.data ){
				this.el = this.options.el;
				this.collection.fetch();
			}
			else if( _.isArray(this.options.data) ) {
				this.collection.set( this.options.data )
			}
		},

		render: function(){
			this.renderCollection();
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
			var collection = model.get("commentsWrapper").collection;
			if( collection instanceof Backbone.Collection ){
				this.collection.off();
				this.collection = collection;
				this.collection
				.setUrl( this.options )
				.on( "sync", this.render, this )
				.setUrl({
					parentType: "image",
					parentId: this.options.parentId
				});
			}
			else {
				this.collection.reset( collection );
			}
			this.renderToDom();
		}

	});

});

