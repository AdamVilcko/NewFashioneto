require([
	'backbone',
	'jquery',
	'handlebars',
	'views/main.js',
	'helper'
	], function( Backbone, $, Handlebars, MainView, Helper ){


	//Backbone router


	var Router = Backbone.Router.extend({

		initialize: function(){
			//Bind change routes action
			this.bind( "all", this.changeRoute );
			this.mainView = new MainView();
		},

		changeRoute: function( route ){			
			Helper.routeState( route );
		},


		//Route definitions hash


		routes:{

			'index': "index",
			'profile': 'profile',
			'profile/:tab': 'profile',
			
			'people': 'people',
			'people/:tab': 'people',
			
			'items': 'items',
			'items/:tab': 'items'

		},


		//Route mapped methods


		index:function(){
			this.profile();
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