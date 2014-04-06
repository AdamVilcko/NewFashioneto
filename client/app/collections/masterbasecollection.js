define(function(require){

	//Deps

	Backbone     = require( 'backbone' );


	return Backbone.Collection.extend({

		initialize: function(){
			App.vent.on( "login:logout", this.reset, this );
		}

	});

});