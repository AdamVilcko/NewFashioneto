define(function(require){

	//Deps

	Backbone     = require( 'backbone' );


	return Backbone.Collection.extend({

		initialize: function( options ){
			this.options = options || {};
			this.nameSpace = this.options.nameSpace || "default";
			App.vent.on( "login:logout", this.logout, this );
			if( typeof this.init !== "undefined") this.init();
		},

		logout: function(){
			this.reset();
		},

		// Get the next model in the collection.
		next : function(model) {
			return this.at(this.indexOf(model) + 1) || this.first();
		},
		// Get the previous model in the collection.
		prev : function(model) {
			return this.at(this.indexOf(model) - 1) || this.last();
		}

	});

});