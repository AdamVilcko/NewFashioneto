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
			this.model.on( "sync", this.update, this );
		},

		update: function(){
			this.attributes = {
				disabled : "disabled"
			}
			this.renderToDom();
		},

		events: {
			'click' : 'registerFollow'
		},

		registerFollow: function( ev ){
			this.model.persist( null, {
				error: function( view, jqXHR, xhr ){
					if( jqXHR.status === 404 ){
						//User doesn't exist

					}
					if( jqXHR.status === 403 ){
						//Tries to follow themselves

					}
					if( jqXHR.status === 208 ){
						//Already reported
					}

					console.log( jqXHR.status );

				}
			} );
		}

	});
});