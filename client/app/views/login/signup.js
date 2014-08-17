define(function(require){

	var

	$              = require( "jquery" ),
	Handlebars     = require( "handlebars" ),
	Cookie         = require( "jquery.cookie" ),

	User           = require( "models/user" ),
	MasterBaseView = require( "views/masterbaseview" ),
	SignupModel = require( "models/signin/signup" ),
	signup         = require( "text!templates/login/signup.hbr" ),
	signupForm     = require( "text!templates/login/signup-form.hbr" );


	return MasterBaseView.extend({

		el: document.body,

		templates: {
			signup: Handlebars.compile( signup ),
			signupForm: Handlebars.compile( signupForm )
		},

		init: function(){
			this.render();
		},

		events: {
			"click .signupbtn" : "signup"
		},

		render: function(){
			this.$el
			.addClass("login")
			.html( this.templates.signup() );

			this.$('.signupform')
			.html( this.templates.signupForm() );
		},

		nodes: {
			username: ".username",
			password: ".password",
			email: ".email",
			displayName: ".displayName",
			loginContainer: ".signupform"
		},


		//Login actions
		signup: function( ev ){
			ev.preventDefault();
			var form, signupData, signUpModel;

			form = $( ev.target ).parents( "form" );

			signupData = {
				username: form.find( this.nodes.username ).val(),
				password: form.find( this.nodes.password ).val(),
				email: form.find( this.nodes.email ).val(),
				displayName: form.find( this.nodes.displayName ).val(),
			};

			new SignupModel( signupData ).save()
			.done(function(){
				debugger;
			})
			.fail(function(){
				debugger;
			});

		},

	});

});
