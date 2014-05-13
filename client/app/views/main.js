define(function(require){

	var

	$                 = require( 'jquery' ),
	Backbone          = require( 'backbone' ),
	Handlebars        = require( 'handlebars' ),
	MasterBaseView    = require( 'views/masterbaseview' ),
	handlebarsHelpers = require( "helpers/handlebarshelpers" ),

	Login             = require( 'views/login/login' ),
	Nav               = require( 'views/ui/nav' ),
	Items             = require( 'views/pages/items' ),
	People            = require( 'views/pages/people' ),
	MyProfile         = require( 'views/pages/myprofile' ),
	GuestProfile      = require( 'views/pages/guestprofile' ),
	mainTemplate      = require( 'text!templates/main.hbr' );





	return MasterBaseView.extend({

		el: document.body,

		nodes: {
			nav: "#nav"
		},

		template: Handlebars.compile( mainTemplate ),

		init: function(){
			this
			.render()
			.invokeCompenents();
			this.$el.removeClass( "login" );
		},

		render: function(){
			this.$el
			.html( this.template() );
			return this;
		},

		invokeCompenents: function() {
			this.nav                = new Nav();

			this.pages              = {};
			this.pages.items        = new Items();
			this.pages.people       = new People();
			this.pages.myprofile    = new MyProfile();
			this.pages.guestprofile = new GuestProfile();

			window.location.hash    = "";
			window.location.hash    = "myprofile";


			return this;
		}

	});
});