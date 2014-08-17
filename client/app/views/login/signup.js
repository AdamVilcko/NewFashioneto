define(function(require){

	var

	$              = require( "jquery" ),
	Handlebars     = require( "handlebars" ),
	Cookie         = require( "jquery.cookie" ),

	User           = require( "models/user" ),
	MasterBaseView = require( "views/masterbaseview" ),
	MasterBaseModel = require( "models/masterbasemodel" ),
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
			var form, signupData;

			form = $( ev.target ).parents( "form" );

			signupData = {
				username: form.find( this.nodes.username ).val(),
				password: form.find( this.nodes.password ).val(),
				email: form.find( this.nodes.email ).val(),
				displayName: form.find( this.nodes.displayName ).val(),
			}

			$.ajax({
				type: "POST",
				context: this,
				url: App.api.get( 'signup' ),
				data: signupData,
				contentType: "application/json" ,
				dataType: "json",
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
					this.proceed( data.user );
				},

				error: function( jqXHR, textStatus, errorThrown ){
					if( jqXHR.status === 401 ){
						alert( "Incorrect login credentials. Please try again!" );
					} else{
						alert( "login method: " + jqXHR.status + ": " + errorThrown  );
					}
				}

			});

		},

	});

});
