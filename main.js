/*My app:*/

require([
	'backbone',
	'jquery',
	'handlebars',
	'views/main.js'	
	], function(Backbone, $, Handlebars, MainView){

	//Backbone router

	var Router = Backbone.Router.extend({

		routes:{
			'': 'index',
			'show/:id': 'show',
			'appointment/:id': 'showAppointment',
			'feed': 'feed',
			'people': 'people',
			'items': 'items',
			'profile': 'profile',
		},

		initialize: function(){
			//Bind change routes action
			this.bind( "all", this.changeRoute );
			this.mainView = new MainView();
		},

		onRouteChange: function(){
			console.log("Route change fire!");
		},

		index:function(){
			console.log("Hello from the router!");
		},		
		
		feed: function( id ){
			App.vent.trigger( 'page:feed', id );	
		},
		people: function( id ){
			App.vent.trigger( 'page:people', id );
		},
		items: function( id ){
			App.vent.trigger( 'page:items', id );
		},
		profile: function( id ){
			App.vent.trigger( 'page:profile', id );
		}

	});
	
	//Instantiate router and start Backbone history

	App.router   = new Router;
	Backbone.history.start();

});