define(function(require){

	var
	Backbone   = require( "backbone" ),
	Handlebars = require( "handlebars" ),
	$          = require( "jquery" ),

	MasterBaseView = require( 'views/masterbaseview' ),
	template   = require( "text!templates/wall/wall.hbr" ),
	Posts      = require( "views/wall/posts" );


	return MasterBaseView.extend({

		nodes:{
			posts: "#postDisplay",
			textarea: "textarea"
		},

		template: Handlebars.compile( template ),

		init: function(){
			App.vent.on( "login:load", this.handle, this );
		},

		handle: function(){
			this.posts = new Posts();
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
			this.posts.collection.create( { content: textarea },
			{
				url: this.posts.collection.url + "/" + App.data.profile.id
			} );
		}

	});

});