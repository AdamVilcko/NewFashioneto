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


	var Router = Backbone.Router.extend({


		initialize: function(){
			this.login = new Login({
				success: function(){
					this.mainView = new MainView();
					//Load default page
					window.location.hash = "profile";
				},
				context: this
			});
		},


		//Route definitions hash


		routes:{

			'': "index",

			'profile': 'myProfile',

			'profile/:tab': 'myProfile',

			'people': 'people',

			'people/:user': 'profile',

			'people/:user/:tab': 'profile',

			'items': 'items',

			'items/:tab': 'items',

			'itemmodal': 'itemModal',

			'photomodal': 'photoModal',

			'logout' : 'logout'

		},


		//Route mapped methods


		index:function(){
			this.profile( "wall" );
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
			App.vent.trigger( 'page:profile', { tab: tab, myProfile: true } );
		},

		profile: function( user, tab ){
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






