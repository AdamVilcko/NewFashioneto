define(function(require){

	var
	Backbone       = require( "backbone" ),
	Handlebars     = require( "handlebars" ),
	$              = require( "jquery" ),

	template       = require( "text!templates/wall/wall.hbr" ),
	AlbumPhotos    = require( 'collections/photos/album-photos' ),
	Posts          = require( "views/wall/posts" ),
	MasterBaseView = require( 'views/masterbaseview' );


	return function(vOpts){
		var self = this, mOpts,

		View = MasterBaseView.extend({
			template: Handlebars.compile( template ),

			init: function(){
				this.posts = new Posts( mOpts.data );
				this.model = mOpts.data.details;
			},

			postRender: function(){
				this.delegateEvents();
				this.$( "#postDisplay" )
				.html( this.posts.renderCollection( null, { sort: true, contextId: "USER" } ).el );
				return this;
			},

			events:{
				"click .sendPost" : function( ev ){
					var
					textarea = this.$( "textarea" ),
					content  = textarea.val();
					textarea.val( "" );
					this.posts.collection.create( { content: content },
					{
						url: this.posts.collection.url + "/" + mOpts.data.id,
						wait: true
					} );
				}
			}

		});

		mOpts = vOpts;
		_.extend( self, new View(vOpts) );
		return self;

	}
});