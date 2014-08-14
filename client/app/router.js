require([
	'backbone',
	"_",
	'jquery',
	'handlebars',
	'views/login/login',
	'views/login/signup',
	'views/main',
	'helper',
	'bootstrap',
	'views/photos/photo-modal',
	'jquery.masonry'
],
function( Backbone, _, $, Handlebars, Login, Signup, MainView, Helper, bootstrap, PhotoModal, Masonry ){

	window.App.vent = _.extend({}, Backbone.Events);

	var Router = Backbone.Router.extend({

		initialize: function(){
			App.history = [];
			this.listenTo(this, 'route', function (name, args) {
			  App.history.push({
			    name : name,
			    args : args,
			    fragment : Backbone.history.fragment
			  });
			});
			this.login = new Login({
				success: function(){
					this.mainView = new MainView();
				},
				context: this
			});
		},

		execute: function( callback, args ){
			console.log( callback );
			console.log( args );
		},


		//Route definitions hash


		routes:{

			'': "index",

			'profile': 'profile',

			'profile/:tab': 'profile',

			'people': 'people',

			'people/:user': 'guestProfile',

			'people/:user/:tab': 'guestProfile',

			'items': 'items',

			'items/:tab/:query': 'items',

			'itemmodal': 'itemModal',

			'photomodal': 'photoModal',

			'logout' : 'logout',

			'signup' : 'signup'

		},


		//Route mapped methods


		index:function(){

		},

		feed: function( tab ){
			App.vent.trigger( 'page:change', { page:"feed", tab: tab } );
		},

		people: function( tab ){
			App.vent.trigger( 'page:change', { page:"people", tab: tab } );
		},

		items: function( tab, query ){
			App.vent.trigger( 'page:change', { page:"items", tab: tab, query: query } );
		},

		profile: function( tab ){
			if(!tab){
				this.navigate("profile/wall");
				tab = "wall";
			}
			App.vent.trigger( 'page:change', { page:"profile", tab: tab, myProfile: true } );
		},

		guestProfile: function( user, tab ){
			if(!tab){
				this.navigate("profile/wall");
				tab = "wall";
			}
			App.vent.trigger( 'page:change', { user: user, page:"profile", tab: tab, myProfile: false } );
		},

		logout: function(){
			App.vent.trigger( 'login:logout' );
		},

		signup: function(){
			var signup = new Signup();
		}

	});

	App.router = new Router;
	Backbone.history.start();

});