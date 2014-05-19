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
			App.vent.on( "items:syncMeta", this.add, this );
			this.on( "add", this.sync );
			this.on( "sync", function( collection, resp, options ){
				App.vent.trigger( "items:metaSynced", collection );
			}, this );
		}
		
	});
});