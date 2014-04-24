define(function(require){

	var
	Backbone       = require("backbone"),
	Handlebars     = require("handlebars"),
	$              = require("jquery"),
	
	MasterBaseView = require( 'views/masterbaseview' ),
	Model          = require("models/like/like"),
	template       = require("text!templates/like/like.hbr");


	 return MasterBaseView.extend({

		init: function( options ){
			this.options = options || { type: "heart", data: { count: 0, actioned: null } };
			this.model = new Model( this.options.data );
			this.model.on( "sync", this.renderToDom, this );
		},

		template: Handlebars.compile( template ),

		render: function(){
			//Need to create method on master base view for merging data before passing into template 
			var insert = this.model.toJSON();
			insert.type = this.options.type;
			this.$el.html( this.template( insert ) );
			return this;
		},		

		events: {
			'click' : 'registerLike'
		},

		registerLike: function(){
			this.model.persist( this.options.parentId );			
		}

	});
});