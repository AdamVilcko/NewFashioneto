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
	Profile        = require( 'views/pages/profile' ),

	//Main page template

	mainTemplate   = require( 'text!templates/main.hbr' );


	return MasterBaseView.extend({

		el: document.body,

		nodes: {
			nav: "#nav"
		},

		template: Handlebars.compile( mainTemplate ),

		initialize: function(){
			this.render();
			this.invokePages();
			this.$el
			.removeClass( "login" )
			.addClass( "loggedin" );
			//Goto selected page or default page
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

		invokePages: function() {
			this.pages = {
				items: new Items(),
				people: new People(),
				profile: new Profile()
			};
		}

	});
});