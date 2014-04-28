define(function(require){

	var
	$              = require("jquery"),
	
	MasterBaseView = require( 'views/masterbaseview' ),
	Model          = require("models/follow/follow");


	 return MasterBaseView.extend({

	 	tagName: "button",

	 	className: "follow btn btn-primary btn-md",

	 	label: App.content.follow,

		init: function( options ){
			this.model = new Model( this.options.data );
			this.model.on( "sync", this.update, this );
		},

		update: function(){
			this.attributes = {
				disabled : "disabled"
			}
			this.renderToDom();
		},

		preRender: function(){
			this.delegateEvents();
		},

		events: {
			'click' : 'registerFollow'
		},

		registerFollow: function( ev ){
			this.model.persist( this.options.parentId );
		}

	});
});