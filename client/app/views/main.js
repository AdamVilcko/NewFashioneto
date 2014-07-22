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
		template: Handlebars.compile( mainTemplate ),

		init: function(){
			this.render().$el.removeClass( "login" );

			this.nav = new Nav();
			this.pages = {
				items   : new Items(),
				people  : new People(),
				profile : new Profile()
			};

			App.vent.on( "page:change", this.controller, this );
		},

		controller: function( args ){
			_.each( this.pages, function( value, key, list ){
				if(value.close){
					value.close();
				}
			});

			this.pages[ args.page ].handler( args );
		}
	});
});