define(function(require){

	var
	Backbone       = require("backbone"),
	Handlebars     = require("handlebars"),
	$              = require("jquery"),
	
	MasterBaseView = require( 'views/masterbaseview' ),
	Model          = require("models/follow/follow");


	 return MasterBaseView.extend({

	 	tagName: "button",
	 	
	 	className: "follow btn btn-primary btn-md",

		init: function( options ){	
			this.model = new Model( this.options.data );
			this.model.on( "sync", this.update, this );
		},

		update: function(){
			this.attributes = {
				disabled : "disabled"
			}
		},		

		events: {
			'click' : 'registerFollow'
		},

		registerFollow: function(){
			this.model.persist( this.options.parentId );			
		}

	});
});