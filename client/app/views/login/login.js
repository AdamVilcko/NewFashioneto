define(function(require){

	var
	Backbone          = require( "backbone" ),
	Handlebars        = require( "handlebars" ),
	$                 = require( "jquery" ),
	Cookie            = require( "jquery.cookie" ),
	Transit           = require( "jquery.transit" ),

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
			password: ".password",
			loginContainer: ".loginform"
		},

		init: function(){
			if( this.checkSessionCookie() ){
				this.getUser();
			} else {
				this.renderMainLogin();
			}
		},

		renderMainLogin: function(){
			this.$el.css( { opacity:0, "margin-left":"20px" } );
			this.$el
			.html( this.templates.mainLogin() )
			.addClass( "login" )
			.find( this.nodes.loginContainer )
			.html( this.templates.loginForm() );
			this.$el.animate( { "margin-left":"0", opacity:1 }, 1000 );
		},

		renderModalLogin: function(){

		},


		//Login actions


		login: function( ev ){
			ev.preventDefault();
			var form, loginCredentials;

			form = $( ev.target ).parents( "form" );

			loginCredentials = {
				username: form.find( this.nodes.username ).val(),
				password: form.find( this.nodes.password ).val()
			}

			$.ajax({
				type: "POST",
				context: this,
				url: App.url( 'login' ),
				data: loginCredentials,

				success: function( data, textStatus, jqXHR ){
					$.cookie( "fashioneto", data.token, {
						expires : 10
					});
					$.ajaxSetup({
						headers: { 'X-Auth-Token': data.token }
					});
					App.data.myprofile = data.user;
					App.userId = data.user.id;

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

		logout: function(){
			$.removeCookie("fashioneto");
			$.ajaxSetup({
				headers: { 'X-Auth-Token': "" }
			});
			App.data = {
		        myprofile:{},
		        guestprofile:{},
		        items:{},
		        people:{}
		    }
			this.renderMainLogin();
		},

		checkSessionCookie: function(){
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

		getUser: function(){
			$.ajax({
				type: "GET",
				context: this,
				url: App.url( 'user' ),
				dataType: "JSON",

				success: function( data, textStatus, jqXHR ){
					App.data.myprofile = data;
					App.userId = data.id;
					this.proceed();
				},

				error: function( jqXHR, textStatus, errorThrown ){
					if( jqXHR.status === 401 ){
						this.renderMainLogin();
					} else {
						alert( "getUser method: " + jqXHR.status + ": " + errorThrown  );
					}

				}

			});
		},

		proceed: function( data ){
			App.vent.trigger( "login:load", data );
			App.vent.on( "login:sessionExpired", this.modalLogin, this );
			App.vent.on( "login:logout", this.logout, this );
			this.options.success.call( this.options.context );
			/*this.close();*/
		}

	});

});


