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

		contextId: "comment",

		tagName: "article",

		className: "media",

		template: Handlebars.compile( template ),

		nodes:{
			comments: ".comments"
		},

		postRender: function(){
			Helper.processDate.call( this );
			if( this.model.has( "commentsWrapper" ) ){
				var commentData = this.model.get("commentsWrapper").collection;
				this.comments = new Comments( { data: commentData, parentId: this.model.get( "id" ) } );
				this.$( this.nodes.comments )
				.append( this.comments.render().el );
			}

			return this;
		}

	});

});