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

		initialize: function( options ){
			this.options = options || {};
			if( this.loggedIn() ){
				this.options.success.call( this.options.context );
				App.vent.on( "login:sessionExpired", this.modalLogin, this );
			} else {
				this.renderMainLogin();
			}
		},

		loggedIn: function(){
			var session = $.cookie("s");
			if( session ){
				$.ajaxSetup({
				    headers: { 'X-Auth-Token': session.token }
				});
				return true;
			} else {
				return false;
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


		//DOM


		templates: {
			loginForm: Handlebars.compile( loginFormTemplate ),
			mainLogin: Handlebars.compile( mainLoginTemplate )
		},

		nodes: {
			username: ".username",
			password: ".password"
		},

		events: {
			"click .loginbtn" : "submit"
		},

		submit: function( ev ){
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
				 	$.cookie("fashioneto", 1, {
					   expires : 10,
					   path    : '/',
					   domain  : 'fashioneto.com'
					});
				 },

				 complete: function( jqXHR, textStatus ){

				 },
				 error: function( jqXHR, textStatus, errorThrown ){

				 },
				 statusCode: {
				    401: function() {

				    },

				    404: function(){
				    	console.log("404 init bruv");
				    }
				 }
			});

		}

	});

});


