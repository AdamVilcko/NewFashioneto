define(function(require){

	var
	Backbone       = require("backbone"),
	Handlebars     = require("handlebars"),
	$              = require("jquery"),

	MasterBaseView = require("views/masterbaseview"),
	template       = require("text!templtes/login/login.hbr");


	MasterBaseView.extend({

		template: Handlebars.compile( template ),

		tagName:"login",

		initialize: function(){
			App.vent.on( "login:sessionExpired", this.modalLogin, this );
			if( this.loggedIn() ){
				this.modalLogin();
			}
		},

		modalLogin: function(){

		},

		loggedIn: function(){
			return false;
		},

		events:{}



	});

});


/*$.cookie("test", 1, {
   expires : 10,           //expires in 10 days

   path    : '/',          //The value of the path attribute of the cookie
                           //(default: path of page that created the cookie).

   domain  : 'jquery.com',  //The value of the domain attribute of the cookie
                           //(default: domain of page that created the cookie).

   secure  : true          //If set to true the secure attribute of the cookie
                           //will be set and the cookie transmission will
                           //require a secure protocol (defaults to false).
});*/