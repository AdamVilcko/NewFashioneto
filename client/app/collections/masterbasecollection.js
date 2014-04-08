define(function(require){

	//Deps

	Backbone     = require( 'backbone' );


	return Backbone.Collection.extend({

		initialize: function( options ){
			this.options = options || {};		
			App.vent.on( "login:logout", this.logout, this );
			if( typeof this.init !== "undefined") this.init();
		},

		logout: function(){			
			this.reset();
		}

	});

});