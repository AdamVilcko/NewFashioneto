define(function(require){

	var
	Backbone   = require("backbone"),
	Handlebars = require("handlebars"),
	$          = require("jquery"),

	MasterBaseView = require( 'views/masterbaseview' ),
	Model      = require("models/like/like"),
	template   = require("text!templates/like/like.hbr");


	 return MasterBaseView.extend({

		init: function( options ){
			this.options = options || { type: "heart", data: { count: 0, actioned: null } };
			this.model = new Model( this.options.data );
			this.model.on( "sync", this.update, this );
			App.like = this;
		},

		template: Handlebars.compile( template ),

		render: function(){
			var insert = this.model.toJSON();
			insert.type = this.options.type;
			this.$el.html( this.template( insert ) );
			return this;
		},

		update: function(){
			this.model.set( "count", this.model.get( "count" ) + 1 );
			this.renderToDom();
		},

		events: {
			'click' : 'registerLike'
		},

		registerLike: function(){
			console.log( this.cid );
			this.model.persist( this.options.parentId );			
		}

	});
});