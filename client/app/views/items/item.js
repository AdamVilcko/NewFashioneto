define(function(require){

	var
	Backbone       = require("backbone"),
	Handlebars     = require("handlebars"),
	$              = require("jquery"),
	
	Like           = require("views/like/like"),
	template       = require("text!templates/items/item.hbr"),
	MasterBaseView = require( 'views/masterbaseview' );

	return MasterBaseView.extend({

		nodes:{
			like: ".likeContainer"
		},

		template: Handlebars.compile( template ),

		className: "item thumbnail",

		init: function(){
			this.like = new Like( {
				type: "heart",
				data: this.model.toJSON().likes,
				parentId: this.model.get( "id" )
			} );
		},

		render: function(){
			this.$el.html( this.template( this.model.toJSON() ) );
			this.$el
			.find( this.nodes.like )
			.html( this.like.render().el );
			return this;
		},

	});

});