define(function(require){

	var

	Backbone             = require( 'backbone' ),
	Helper               = require( 'helper' ),

	MasterBaseCollection = require( 'collections/masterbasecollection' ),
	ItemModel            = require( 'models/items/item' );


	return MasterBaseCollection.extend({

		model: ItemModel,

		url: App.api.get( "items" ),

		fetchMeta: function( obj ){
			return this.fetch( {
				data: JSON.stringify( obj ),
				method: "POST",
				contentType: "application/json"
			} );
		},

		parse: function( reponse ){
			return reponse.collection;
		}

	});
});