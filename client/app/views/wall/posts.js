define(function(require){

	var
	Backbone        = require("backbone"),
	Handlebars      = require("handlebars"),
	$               = require("jquery"),

	MasterBaseView  = require( 'views/masterbaseview' ),
	PostView        = require( "views/wall/post" ),
	PostsCollection = require("collections/wall/posts");


	return MasterBaseView.extend({

		modelView: PostView,

		emptyCollectionTemplate: Handlebars.compile( "<div class='alert alert-info' style='text-align:center'>No posts yet! (Come on, you're better than this)</div>" ),

		init: function(){
			this.collection = this.options.data.get('commentsWrapper.collection');
			this.collection
			.on( "sync", this.renderCollection, this );
		}

	});

});