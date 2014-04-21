define(function(require){

	var
	Backbone   = require("backbone"),
	Handlebars = require("handlebars"),
	$          = require("jquery"),
	Helper     = require("helper"),

	MasterBaseView = require( 'views/masterbaseview' ),
	template   = require("text!templates/comments/comment.hbr");



	return MasterBaseView.extend({

		className: "media comment",

		template: Handlebars.compile( template ),

		render: function(){

			var data = this.model.toJSON();
			data.imageUrl = App.url( "image" ) + "THUMBNAIL/" + data.imageId;

			this.$el.html( this.template( data ) );
			Helper.processDate.call( this );
			return this;
		}

	});

});