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
			this.model.on( "change", this.update, this );
			this.updateViewState();
		},

		update: function(){
			this.updateViewState();
			this.renderToDom();
		},

		updateViewState: function(){
			if( this.model.get( "isFollowed" ) )
				this.$el.attr( "disabled", true );
			else 
				this.$el.attr( "disabled", false );			
		},		

		events: {
			'click' : 'followUnfollow'
		},

		followUnfollow: function( ev ){
			var options;

			if( ! this.model.get( "isFollowed" ) ){

				//Follow
				options = {
					type: "POST",
					success: function( model, response, options ){
						this.model.set( "isFollowed", true );
					},
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
							console.log( jqXHR.status );
						}
					}
				}				

			} else {

				//Unfollow
				options = {
					type: "DELETE",
					error: function( view, jqXHR, xhr ){
						if( jqXHR.status === 404 ){
							//User doesn't exist
							console.log( jqXHR.status );

						}
						if( jqXHR.status === 403 ){
							//Tries to unfollow themselves
							console.log( jqXHR.status );

						}
						if( jqXHR.status === 208 ){
							//Unfollow someone you are not following anyway
							console.log( jqXHR.status );
						}				

					}
				}

			}

			this.model.persist( null, options );
			
		}

	});
});