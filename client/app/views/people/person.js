define(function(require){

	var
	Backbone       = require("backbone"),
	Handlebars     = require("handlebars"),
	$              = require("jquery"),
	
	Follow = require("views/follow/follow"),
	template       = require("text!templates/people/person.hbr"),
	MasterBaseView = require( 'views/masterbaseview' );

	return MasterBaseView.extend({

		template: Handlebars.compile( template ),

		className: "people",

		init: function(){
			/*this.follow = new Follow({
				data: this.model,
				parentId: this.model.get( "id" )
			});*/
		},

		render: function(){
			this.$el
			.html( this.template( this.model.toJSON() ) )
			/*.find( ".followContainer" )
			.html( this.follow.render().el )*/;
			return this;
		},

	});

});