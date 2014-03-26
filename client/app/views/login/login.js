define(function(require){

	var
	Backbone          = require( "backbone" ),
	Handlebars        = require( "handlebars" ),
	$                 = require( "jquery" ),
	Cookie            = require( "jquery.cookie" ),

	MasterBaseView    = require( "views/masterbaseview" ),
	mainLoginTemplate = require( "text!templates/login/mainlogin.hbr" ),
	loginFormTemplate = require( "text!templates/login/loginform.hbr" );


	return MasterBaseView.extend({

		el: document.body,

		templates: {
			loginForm: Handlebars.compile( loginFormTemplate ),
			mainLogin: Handlebars.compile( mainLoginTemplate )
		},

		events: {
			"click .loginbtn" : "login"
		},

		nodes: {
			username: ".username",
			password: ".password"
		},

		initialize: function( options ){

			this.options = options || {};

			if( this.checkLoggedIn() ){

				this.proceed();

			} else {

				this.renderMainLogin();
			}

		},

		renderMainLogin: function(){
			this.$el
			.html( this.templates.mainLogin() )
			.find( ".login" )
			.html( this.templates.loginForm() );
		},

		renderModalLogin: function(){

		},


		//Login actions


		login: function( ev ){
			ev.preventDefault();
			var form, loginCredentials;

			form = $( ev.target ).parents( "form" );

			loginCredentials = {
				username: form.find( ".username" ).val(),
				password: form.find( ".password" ).val()
			}

			$.ajax({
				type: "POST",
				context: this,
				url: App.url( 'login' ),
				data: loginCredentials,

				success: function( data, textStatus, jqXHR ){
					$.cookie("fashioneto", data.token, {
						expires : 10
					});
					$.ajaxSetup({
						headers: { 'X-Auth-Token': data.token }
					});
					this.proceed();
				},

				error: function( jqXHR, textStatus, errorThrown ){
					if( jqXHR.status === 401 ){
						alert( "Incorrect login credentials. Please try again!" );
					} else{
						alert( "Some other tings have happened that I can't explain maaan, you get me? The HTTP response is: " + textStatus  );
					}
				}

			});

		},

		logout: function(){
			$.removeCookie("fashioneto");
			//Need to add "reset application state" process - remove all events, clear memory etc.
			//Exit to login
			this.renderMainLogin();
		},

		checkLoggedIn: function(){
			var sessionToken = $.cookie("fashioneto");
			if( sessionToken ){
				$.ajaxSetup({
				    headers: { 'X-Auth-Token': sessionToken }
				});
				return true;
			} else {
				return false;
			}
		},

		proceed: function(){
			App.vent.on( "login:sessionExpired", this.modalLogin, this );
			App.vent.on( "login:logout", this.logout, this );
			this.options.success.call( this.options.context );
		}

	});

});


