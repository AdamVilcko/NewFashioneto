define(function(require){

	var
	Backbone   = require("backbone"),
	Handlebars = require("handlebars"),
	$          = require("jquery"),	
	Helper     = require('helper'),
	
	Comments   = require("views/comments/comments"),
	template   = require("text!templates/wall/post.hbr");


	return Backbone.View.extend({

		tagName: "article",
		className: "media",

		template: Handlebars.compile( template ),

		nodes:{
			comments: ".comments"
		},		

		render: function(){
			this.$el.html( this.template( this.model.toJSON() ) );
			Helper.processDate.call( this );
			if( this.model.has( "commentsWrapper" ) ){				
				var commentData = this.model.toJSON().commentsWrapper.collection;
				this.comments = new Comments( { data: commentData } );				
				this.$el.find( this.nodes.comments )
				.append( this.comments.render().el );
			}
			return this;
		}
		
	});

});