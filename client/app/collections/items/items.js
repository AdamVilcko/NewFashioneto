define(function(require){

	var

	Backbone             = require( 'backbone' ),
	Helper               = require( 'helper' ),

	MasterBaseCollection = require( 'collections/masterbasecollection' ),
	Model                = require( 'models/items/item' );


	return MasterBaseCollection.extend({

		model : Model,

		init: function(){
			this.addEvents();
		},

		addEvents: function(){
			this.on( "sync", function( collection, resp, options ){
				App.vent.trigger( "items:fetchMeta", collection.pluck( "id" ) );
			}, this );
		},

		parse: function( response ){
			return response.products;
		},

		search: function( ev, args ){
			this.reset();
			this.fetch( {
				dataType: "jsonp",
				url: Helper.queryBuilder( args )
			} );
		},

		fetchById: function(){
			
		}

	});
});