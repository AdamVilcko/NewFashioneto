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
			App.vent.on( "items:syncMeta", this.addToCollection, this );
			this.on( "add", this.update );
			this.on( "sync", function( collection, resp, options ){
				App.vent.trigger( "items:metaSynced", collection );
			}, this );
		},

		addToCollection: function( obj ){

			var hardcode= [1,2,3,442698073];

			$.ajax( {
				url: App.api.get( "items" ),
				method: "POST",
				contentType: "application/json",
				data: hardcode,
				dataType :"json",
				type:"POST",
				success: this.success,
				processData:false
			} );

		},

		success: function( collection ){
			console.log( collection );

		}
		
	});
});