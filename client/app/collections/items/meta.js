define(function(require){

	var

	Backbone             = require( 'backbone' ),
	Helper               = require( 'helper' ),

	MasterBaseCollection = require( 'collections/masterbasecollection' ),
	ItemModel            = require( 'models/items/item' );


	return MasterBaseCollection.extend({

		model: ItemModel,

		url: App.api.get( "items" ),

		init: function(){
			App.vent.on( this.nameSpace + ":items:fetchMeta", this.fetchMeta, this );
			this.on( "sync", function( collection, resp, options ){
				App.vent.trigger( "items:updateLikes", collection );
			}, this );
		},

		fetchMeta: function( obj ){
			this.fetch( {
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