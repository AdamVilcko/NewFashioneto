require([
	'backbone',
	"_",
	'jquery',
	'handlebars',
	'views/main.js',
	'helper'
],
function( Backbone, _, $, Handlebars, MainView, Helper ){


	var Router = Backbone.Router.extend({


		initialize: function(){
			this.mainView = new MainView();
			this.bind( "all", this.changeRoute );			
		},

		changeRoute: function( route ){			
			Helper.routeState( route );
		},


		//Route definitions hash


		routes:{

			'': "index",
			'profile': 'profile',
			'profile/:tab': 'profile',
			
			'people': 'people',
			'people/:tab': 'people',
			
			'items': 'items',
			'items/:tab': 'items'

		},


		//Route mapped methods


		index:function(){
			this.profile( "wall" );
		},
		
		feed: function( tab ){
			App.vent.trigger( 'page:feed', {
				pageName:"feed",
				tab: tab
			});
		},
		people: function( tab ){
			App.vent.trigger( 'page:people', {
				pageName:"people",
				tab: tab
			});
		},
		items: function( tab ){
			App.vent.trigger( 'page:items', {
				pageName:"items",
				tab: tab
			});
		},
		profile: function( tab ){
			App.vent.trigger( 'page:profile', {
				pageName:"profile",
				tab: tab
			});
		}

	});


	//Instantiate router and start Backbone history


	App.router   = new Router;
	Backbone.history.start();


});





	
