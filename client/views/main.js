define(function(require){

	var

	//Deps

	$            = require( 'jquery' ),
	Backbone     = require( 'backbone' ),
	Handlebars   = require( 'handlebars' ),

	//UI views

	Nav  = require( 'views/nav' ),
	
	//Page views
	
	Feed         = require( 'views/feed' ),
	Items        = require( 'views/items' ),
	People       = require( 'views/people' ),
	Profile      = require( 'views/profile' ),

	//Main page template

	mainTemplate = require( 'text!templates/main.hbr' );

	//Main view

	return Backbone.View.extend({

		el: document.body,

		template: Handlebars.compile( mainTemplate ),

		initialize:function(){
			this.render();
			this.intantiateViews();			
		},

		render: function(){
			this.$el.html( this.template() );
		},

		intantiateViews: function(){
			this.ui = {				
				nav: new Nav()
			};

			this.pages = [
				new Feed({ parent: this }),
				new Items({ parent: this }),
				new People({ parent: this }),
				new Profile({ parent: this })
			];
		},

		events:{
			"click" : "closeNav"
		},

		closeNav: function(){
			this.ui.nav.removeActiveState();
		}


		
	});
});