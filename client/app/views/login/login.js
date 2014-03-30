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

		initialize: function( options ){
			this.options = options || {};
			if( this.checkLoggedIn() ){
				this.proceed();
			} else {
				this.renderMainLogin();
			}
		},

		renderMainLogin: function(){
			this.$el.css({ opacity:0, "margin-left":"20px" });
			this.$el
			.html( this.templates.mainLogin() )
			.addClass( "login" )
			.find( this.nodes.loginContainer )
			.html( this.templates.loginForm() );
			this.$el.animate({ "margin-left":"0", opacity:1 }, 1000 );
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
					App.data = data.user;
					this.proceed();
				},

				error: function( jqXHR, textStatus, errorThrown ){
					if( jqXHR.status === 401 ){
						alert( "Incorrect login credentials. Please try again!" );
					} else{
						alert( jqXHR.status + ": " + errorThrown  );
					}
				}

			});

		},

		logout: function(){
			$.removeCookie("fashioneto");
			$.ajaxSetup({
				headers: { 'X-Auth-Token': "" }
			});
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
			this.$el.css({ opacity:0 });
			this.options.success.call( this.options.context );
			this.$el.animate({ opacity:1 }, 1000 );
			App.vent.trigger( "login:load" );
		}		

	});

});


