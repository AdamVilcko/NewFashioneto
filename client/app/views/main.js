define(function(require){

	var

	//Deps

	$              = require( 'jquery' ),
	Backbone       = require( 'backbone' ),
	Handlebars     = require( 'handlebars' ),

	Login = require( 'views/login/login' ),
	
	//Master base view
	
	MasterBaseView = require( 'views/masterbaseview' ),
	
	//UI views
	
	Nav            = require( 'views/ui/nav' ),
	
	//Page views
	
	Feed           = require( 'views/pages/feed' ),
	Items          = require( 'views/pages/items' ),
	People         = require( 'views/pages/people' ),
	MyProfile        = require( 'views/pages/myprofile' ),
	GuestProfile        = require( 'views/pages/guestprofile' ),
	
	//Main page template
	
	mainTemplate   = require( 'text!templates/main.hbr' );


	return MasterBaseView.extend({

		el: document.body,

		nodes: {
			nav: "#nav"
		},

		template: Handlebars.compile( mainTemplate ),

		init: function(){
			this
			.render()
			.loadPages();
			this.$el.removeClass( "login" );
		},

		render: function(){
			this.$el
			.html( this.template() )
			.find( this.nodes.nav )
			.html( this.ui.nav.render().el );
			return this;
		},

		ui: {
			nav: new Nav()
		},

		loadPages: function() {
			this.pages = {};
			this.pages.items = new Items();
			this.pages.people = new People();
			this.pages.myprofile = new MyProfile( { data: "myprofile" } );
			this.pages.guestprofile = new GuestProfile( { data: "guestprofile" } );

			window.location.hash = "";
			window.location.hash = "profile";			
			
			return this;
		}

	});
});