define(function(require){

	var

	$              = require("jquery"),

	MasterBaseView = require( 'views/masterbaseview' ),
	Model          = require( "models/follow/follow" );


	return MasterBaseView.extend({

	 	tagName: "button",

	 	className: "follow btn btn-primary btn-md",

	 	label: App.content.follow,

		init: function( options ){
			this.model = new Model( this.options );
			this.model.on( "sync", this.updateRender, this );
			this.updateViewState();
		},

		updateRender: function(){
			this.updateViewState();
			this.renderToDom();
		},

		updateViewState: function(){
			if( this.model.get( "isFollowed" ) ){
				this.$el.addClass( "following" );
				this.label = "Following";
			} else {
				this.$el.removeClass( "following" );
				this.label = "Follow";
			}
		},

		events: {
			'click' : 'followUnfollow'
		},

		followUnfollow: function( ev ){
			var options, action, type, label = {};
			
			label.follow = "follow";
			label.unfollow = "unfollow";
			label.isFollowed = "isFollowed";

			if( ! this.model.get( label.isFollowed ) ){
				action = label.follow,
				type: "POST";
			} else {
				action = label.unfollow,
				type: "DELETE"
			}
				
			options = {
				type: type,	

				error: function( view, jqXHR, xhr ){
					if( jqXHR.status === 404 ){
						//User doesn't exist
						console.log( jqXHR.status );
					}
					if( jqXHR.status === 403 ){
						//Tries to follow themselves
						console.log( jqXHR.status );
					}
					if( jqXHR.status === 208 ){
						//Following that person already
						this.model.set( label.isFollowed, ( action === label.follow ) );						
						this.updateRender();
					}
				}
			}
		
			this.model.persist( null, options );
			
		}

	});
});