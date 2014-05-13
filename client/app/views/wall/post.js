define(function(require){

	var
	Backbone       = require("backbone"),
	Handlebars     = require("handlebars"),
	$              = require("jquery"),
	Helper         = require('helper'),

	MasterBaseView = require( 'views/masterbaseview' ),
	Like           = require("views/like/like"),
	Comments       = require("views/comments/comments"),
	template       = require("text!templates/wall/post.hbr");


	return MasterBaseView.extend({

		tagName: "article",
		className: "media",

		template: Handlebars.compile( template ),

		nodes:{
			comments: ".comments",
			like: ".likeContainer"
		},

		init: function(){

		},

		postRender: function(){
			this.$el
			.find( this.nodes.like )
			.html( this.like.render().el );

			Helper.processDate.call( this );

			if( this.model.has( "commentsWrapper" ) ){
				var commentData = this.model.toJSON().commentsWrapper.collection;
				this.comments = new Comments( { data: commentData, parentId: this.model.get( "id" ) } );
				this.$el.find( this.nodes.comments )
				.append( this.comments.render().el );
			}

			return this;
		}

	});

});