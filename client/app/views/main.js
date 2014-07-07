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
	Profile           = require( 'views/pages/profile' ),
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
			.invokeComponents();
			this.$el.removeClass( "login" );
			App.vent.on( "page:change", this.controller, this );
			this.main = this.$el.find( "#main" );
		},

		controller: function( args ){
			_.each( this.pages, function( value, key, list ){
				if(value.close){
					value.close();
				}
			});
			this.pages[ args.page ].handler( args );
		},

		invokeComponents: function() {
			this.nav             = new Nav();
			this.pages           = {};
			this.pages.items     = new Items();
			this.pages.people    = new People();
			this.pages.profile   = new Profile();

			//This will need to be done by a page ready event
			window.location.hash = "m";
			setTimeout( function(){

				window.location.hash = "profile";
			}, 300 );

			return this;
		}

	});
});