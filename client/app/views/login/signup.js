define(function(require){

	var

	$              = require( "jquery" ),
	Handlebars     = require( "handlebars" ),
	Cookie         = require( "jquery.cookie" ),

	User           = require( "models/user" ),
	MasterBaseView = require( "views/masterbaseview" ),
	signup         = require( "text!templates/login/signup.hbr" ),
	signupForm     = require( "text!templates/login/signup-form.hbr" );


	return MasterBaseView.extend({

		el: "document.body",

		templates: {
			signup: Handlebars.compile( signup ),
			signupForm: Handlebars.compile( signupForm )
		},

		init: function(){
			this.render();
		},

		render: function(){
			this.$el
			.html( this.templates.signup() );

			this.$el
			.html( this.templates.signupForm() );
		}

	});

});
