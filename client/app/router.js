require([
	'backbone',
	"_",
	'jquery',
	'handlebars',
	'views/login/login',
	'views/main',
	'helper',
	'bootstrap',
	'jquery.masonry'
],
function( Backbone, _, $, Handlebars, Login, MainView, Helper, bootstrap, masonry ){

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

			'myprofile': 'myProfile',

			'myprofile/:tab': 'myProfile',

			'people': 'people',

			'people/:user': 'guestProfile',

			'people/:user/:tab': 'guestProfile',

			'items': 'items',

			'items/:tab': 'items',

			'itemmodal': 'itemModal',

			'photomodal': 'photoModal',

			'logout' : 'logout'

		},


		//Route mapped methods


		index:function(){

		},

		feed: function( tab ){
			App.vent.trigger( 'page:feed', { tab: tab } );
		},

		people: function( tab ){
			App.vent.trigger( 'page:people', { tab: tab } );
		},

		items: function( tab ){
			App.vent.trigger( 'page:items', { tab: tab } );
		},

		myProfile: function( tab ){
			$("#main").empty();
			App.vent.trigger( 'page:profile', { tab: tab, myProfile: true } );
		},

		guestProfile: function( user, tab ){
			$("#main").empty();
			App.vent.trigger( 'page:profile', { user: user , tab: tab, myProfile: false } );
		},

		itemModal: function(){
			$('#itemModal').modal();
		},

		photoModal: function(){
			$('#photoModal').modal();
		},

		logout: function(){
			App.vent.trigger( 'login:logout' );
		}


	});


	//Instantiate router and start Backbone history


	var router   = new Router;
	Backbone.history.start();


});






