define(function(require){

	var

	$              = require( "jquery" ),
	Handlebars     = require( "handlebars" ),
	Cookie         = require( "jquery.cookie" ),

	User           = require( "models/user" ),
	MasterBaseView = require( "views/masterbaseview" ),
	SignupModel = require( "models/signin/signup" ),
	signup         = require( "text!templates/login/signup.hbr" ),
	signupForm     = require( "text!templates/login/signup-form.hbr" ),
	MainView       = require( "views/main"),
	LoginView	   = require ("views/login/login");


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
			var form, signupData, signUpModel, self = this;

			form = $( ev.target ).parents( "form" );

			signupData = {
				username: form.find( this.nodes.username ).val(),
				password: form.find( this.nodes.password ).val(),
				email: form.find( this.nodes.email ).val(),
				displayName: form.find( this.nodes.displayName ).val(),
			};

			new SignupModel( signupData ).save()
			.done(function(data){
				debugger;
				self.success(data);
			})
			.fail(function(){
				debugger;
			});

		},
		
		success: function( data, textStatus, jqXHR ){
			$.cookie( "fashioneto", data.token, {
				expires : 10
			});
			$.ajaxSetup({
				headers: { 'X-Auth-Token': data.token }
			});

			//Gonna get Felipe to refactor so details and id are returned only
			data.user.details.id = data.user.id;
			App.user = new User( data.user.details );
			var mainView = new MainView();
		},

	});

});
