/*My app:*/

require([
	'backbone',
	'jquery',
	'handlebars',
	'views/main.js'	
	], function( Backbone, $, Handlebars, MainView ){

	//Backbone router

	var Router = Backbone.Router.extend({

		routes:{
			'index': "profile",
			'profile': 'profile',
			'profile/:tab': 'profile',

			'people': 'people',
			'people/:tab': 'people',

			'items': 'items',
			'items/:tab': 'items'			
		},

		initialize: function(){
			//Bind change routes action
			this.bind( "all", this.changeRoute );
			this.mainView = new MainView();
		},

		changeRoute: function(){
			
		},

		index:function(){
			this.profile( "" );
		},
		
		feed: function( tab ){
			App.vent.trigger( 'page:feed', tab );	
		},
		people: function( tab ){
			App.vent.trigger( 'page:people', tab );
		},
		items: function( tab ){
			App.vent.trigger( 'page:items', tab );
		},
		profile: function( tab ){
			App.vent.trigger( 'page:profile', tab );
		}


	});
	
	//Instantiate router and start Backbone history

	App.router   = new Router;
	Backbone.history.start();

});