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
			this.posts = new Posts( { master: this.master } );
		},		

		render: function(){
			this.$el
			.html( this.template() )
			.find( this.nodes.posts )
			.html( this.posts.render().el );
			return this;
		},

		events:{
			"click .sendPost" : "post"
		},

		post: function( ev ){
			var textarea = this.$el.find( this.nodes.textarea );
			content = textarea.val();
			textarea.val( "" );
			this.posts.collection.create( { content: content },
			{
				url: this.posts.collection.url + "/" + App.data.myprofile.id
			} );
		}

	});

});