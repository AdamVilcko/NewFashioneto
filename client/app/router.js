require([
	'backbone',
	"_",
	'jquery',
	'handlebars',
	'views/main',
	'helper',
	'bootstrap',
	'jquery.masonry'
],
function( Backbone, _, $, Handlebars, MainView, Helper, bootstrap, masonry ){


	var Router = Backbone.Router.extend({


		initialize: function(){
			//Login
			this.mainView = new MainView();
			this.bind( "all", this.changeRoute );
		},

		changeRoute: function(){

		},


		//Route definitions hash


		routes:{

			'': "index",
			'profile': 'profile',
			'profile/:tab': 'profile',

			'people': 'people',
			'people/:tab': 'people',

			'items': 'items',
			'items/:tab': 'items',

			'itemmodal': 'itemModal',
			'photomodal': 'photoModal'

		},


		//Route mapped methods


		index:function(){
			this.profile( "wall" );
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
		},

		itemModal: function(){
			$('#itemModal').modal();
		},

		photoModal: function(){
			$('#photoModal').modal();
		}


	});


	//Instantiate router and start Backbone history


	var router   = new Router;
	Backbone.history.start();


});






