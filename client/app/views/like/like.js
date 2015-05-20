define(function(require){

	var

	$              = require("jquery"),
	Backbone       = require("backbone"),
	Handlebars     = require("handlebars"),

	MasterBaseView = require( 'views/masterbaseview' ),
	Model          = require("models/like/like"),
	template       = require("text!templates/like/like.hbr");


	return MasterBaseView.extend({

		template: Handlebars.compile( template ),

		init: function( options ){
			this.options = options || { type: "heart", data: { count: 0, actioned: null } };
			this.model = new Model( this.options.data );
			this.model.on( "sync change", this.renderToDom, this );
			this.model.url = App.api.get( "like", this.options.contextId );
			this.id = this.options.parentId;
		},

		events: {
			'click' : 'registerLike'
		},

		registerLike: function(){
            		this.model.persist( this.id, this.model.get("actioned") ? { type: "DELETE"} : null );
		},

		bindData: function( aModel ){
			this.model.set( aModel.get("likes") );
			this.id = aModel.id;
			this.renderToDom();
		}

	});
});
