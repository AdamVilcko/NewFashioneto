define(function(require){

	var

	$                 = require( "jquery" ),
	Handlebars        = require( "handlebars" ),

	User              = require( "models/user" ),
	UploaderModal   = require('views/photos/uploader-modal'),
	SignupModel = require( "models/signin/signup" ),
	Photos          = require('views/photos/album-photos'),
	MasterBaseView    = require( "views/masterbaseview" ),
	
	mainPreregisterTemplate = require( "text!templates/login/welcome.hbr" ),
	preregisterFormTemplate = require( "text!templates/login/welcome-form.hbr" );

	
	mainBasicInfoTemplate = require( "text!templates/login/basicinfo.hbr" ),
	basicInfoFormTemplate = require( "text!templates/login/basicinfo-form.hbr" );

	mainPhotosTemplate = require( "text!templates/login/photos.hbr" ),
	photosFormTemplate = require( "text!templates/login/photos-form.hbr" );
	
	thankYouTemplate = require( "text!templates/login/thankyou.hbr" );
	
	return MasterBaseView.extend({

		el: document.body,

		templates: {
			preregisterForm: Handlebars.compile( preregisterFormTemplate ),
			mainPreregister: Handlebars.compile( mainPreregisterTemplate ),
			basicInfoForm:  Handlebars.compile( basicInfoFormTemplate ),
			mainBasicInfoForm:  Handlebars.compile( mainBasicInfoTemplate ),
			photosForm:  Handlebars.compile( photosFormTemplate ),
			mainPhotosForm:  Handlebars.compile( mainPhotosTemplate ),
			thankyouTemplate: Handlebars.compile( thankYouTemplate ), 
		},

		events: {
			"click #loginFbBtn" : "loginFb",
			"click #loginFbBtnTrigger" : "renderBasicInfo",
			"click #signup" : "preregister",
			"click #proceedFbBtn":	"proceed",
			"click #basicInfoContinue":	"proceedToPhotos",
			"click #addPhotos": function(){
				this.uploaderModal = new UploaderModal({
					collection: this.photos.collection
				});
			},
			"click .uploadFromFacebook": "uploadFromFacebook",
			"click #done":	"done",
		},

		nodes: {
			username: ".username",
			password: ".password",
			confirmPassword: ".confirmPassword",
			email: ".email",
			displayName: ".displayName"
		},

		init: function(){
			this.photos = new Photos();
			this.photos.collection.on("reset add", this.renderPhotos, this );
			this.render();
		},

		render: function(){
			this.$el
			.html( this.templates.mainPreregister() )
			.addClass( "welcome" );

			this.$('.welcomeform')
			.html( this.templates.preregisterForm() );
		},
		
		renderBasicInfo:  function(){
			event.preventDefault();
			this.$el
			.html( this.templates.mainBasicInfoForm() )
			.removeClass("welcome");

			this.$('.basicinfoform')
			.html( this.templates.basicInfoForm() );
		},
		
		loginFb: function() {
			event.preventDefault();
		},
		
		uploadFromFacebook: function(ev) {
			($(ev.target)[0]).classList.add('selected')
			$.ajax({
				type: "POST",
				context: this,
				url: App.api.get( 'uploadFB' ),
				data: encodeURIComponent($(ev.target)[0].src),
				success: function(data) {
					
					this.photos.collection.add({
		        		id: JSON.parse(data).id
		        	});
					this.renderPhotos},
				error: function( jqXHR, textStatus, errorThrown ){
					if( jqXHR.status === 401 ){
						alert( "Incorrect login credentials. Please try again!" );
					} else{
						alert( "login method: " + jqXHR.status + ": " + errorThrown  );
					}
				}

			});
		},

		renderPhotos:  function(){
			console.log('render photos');
			this.$el
			.html( this.templates.mainPhotosForm() );

			this.$('.photosform')
			.html( this.templates.photosForm() );
			if (this.photos.collection && this.photos.collection.length > 0 ) {
				this.$('#photosContainerTitle').removeClass("displayNone");
				this.$('#photosContainerTitle').addClass("displayBlock");
			}
			this.$("#photosContainer")
			.html( this.photos.renderCollection( null, { collection: this.photos.collection } ).el );

		},


		done:  function() {
			if (!this.photos.collection || this.photos.collection.length < 3 ) {
				this.renderPhotos();
				this.$('.errors').html("Please select or upload at least three photos");
			} else {
				this.$el
				.html( this.templates.thankyouTemplate() )
				.addClass( "welcome" );
			}
		},
		
		preregister: function( ev ){
			this.renderBasicInfo();
		},

		success: function( data, textStatus, jqXHR ){
			App.user = new User( data );
			this.proceed( data );
		},
		
		proceed: function( data ){
			this.renderBasicInfo();
		},
		proceedToPhotos: function( ev ){
			var form = $( ev.target ).parents( "form" );
			var self = this;
			var usernameVal = form.find( this.nodes.username ).val();
			var errors = '';
			if (!usernameVal.trim()) {
				errors = errors.concat('Please secify your username<br>');
			} 
			var emailVal = form.find( this.nodes.email ).val();
			if (!emailVal.trim()) {
				errors = errors.concat('Please secify your email<br>');
			} 
			var displayNameVal = form.find( this.nodes.displayName ).val();
			if (!displayNameVal.trim()) {
				errors = errors.concat('Please secify your full name<br>');
			} 
			var passwordVal = form.find( this.nodes.password ).val();
			if (!passwordVal.trim()) {
				errors = errors.concat('Please secify your password<br>');
			} 
			var confirmPasswordVal = form.find( this.nodes.confirmPassword ).val();
			if (!confirmPasswordVal.trim() || !(passwordVal === confirmPasswordVal) ) {
				errors = errors.concat('Passwords must match<br>');
			} 			
			if (errors.trim()) {
				this.renderBasicInfo();
				this.$('.errors').html(errors);
			} else {
			
			this.userData = {
					username: form.find( this.nodes.username ).val(),
					password: form.find( this.nodes.password ).val(),
					email: form.find( this.nodes.email ).val(),
					displayName: form.find( this.nodes.displayName ).val()
			};
			new SignupModel( this.userData ).save()
			.done(function(data){
				//debugger;
				/*$.cookie( "fashioneto", data.token, {
					expires : 10
				});*/
				$.ajaxSetup({
					headers: { 'X-Auth-Token': data.token }
				});

				//Gonna get Felipe to refactor so details and id are returned only
				data.user.details.id = data.user.id;
				App.user = new User( data.user.details );
				console.log('App.user: ' + App.user);
				self.renderPhotos();
			})
			.fail(function(){
				//debugger;
			});
			}

		}
		
	});

});


