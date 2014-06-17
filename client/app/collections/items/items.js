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
				App.vent.trigger( this.nameSpace + ":items:fetchMeta", collection.pluck( "id" ) );
			}, this );
		},

		parse: function( response ){
			return response.products;
		},

		search: function( ev, args ){
			this.reset();
			return this.fetch( {
				dataType: "jsonp",
				url: Helper.queryBuilder( args )
			} );
		},

		fetchById: function( args ){
			this.reset();
			return this.fetch( {
				dataType: "jsonp",
				url: Helper.queryBuilder( args )
			} );
		}

	});
});