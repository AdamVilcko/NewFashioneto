define(function(require){

	var
	Backbone   = require( "backbone" ),
	Handlebars = require( "handlebars" ),
	$          = require( "jquery" ),

	template   = require( "text!templates/wall/wall.hbr" ),
	Posts      = require( "views/wall/posts" );


	return Backbone.View.extend({

		nodes:{
			posts: "#postDisplay",
			textarea: "textarea"
		},

		template: Handlebars.compile( template ),

		initialize: function(){
			App.vent.on( "login:load", this.handle, this );
		},

		handle: function(){
			this.posts = new Posts(  App.data.profile.commentsWrapper.collection );
		},

		render: function(){
			this.$el
			.html( this.template() )
			.find( this.nodes.posts )
			.html( this.posts.render().el );
			return this;
		},

		events:{
			"click textarea" : "post"
		},

		post: function( ev ){
			var textarea = this.$el.find( this.nodes.textarea ).val();
			this.posts.collection.add( { content: textarea } );
		}

	});

});