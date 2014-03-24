define(function(require){

	var
	Backbone          = require("backbone"),
	Handlebars        = require("handlebars"),
	$                 = require("jquery"),
	Cookie            = require("jquery.cookie"),
	
	MasterBaseView    = require("views/masterbaseview"),
	loginFormTemplate = require("text!templtes/login/login.hbr");


	MasterBaseView.extend({

		initialize: function( options ){
			this.options = options || {};
			App.vent.on( "login:sessionExpired", this.modalLogin, this );
			if( this.loggedIn() ){
				this.options.success();
			} else {
				this.mainLogin();
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

			var
			loginCredentials = {
				username: ev.something,
				passowrd: ev.something
			};

			$.ajax({
				 type: "POST",
				 context: this,
				 url: App.rest.login,
				 data: loginCredentials,

				 success: function( data, textStatus, jqXHR ){
				 	$.cookie("fashioneto", 1, {
					   expires : 10,
					   path    : '/',
					   domain  : 'fashioneto.com',
					   /*secure  : true*/          //If set to true the secure attribute of the cookie
					                           //will be set and the cookie transmission will
					                           //require a secure protocol (defaults to false).
					});

				 },

				 complete: function( jqXHR, textStatus ){

				 },
				 error: function( jqXHR, textStatus, errorThrown ){

				 },
				 statusCode: {
				    401: function() {
				      //Unauthorised access
				    }
				 }
			});

		}

	});

});


