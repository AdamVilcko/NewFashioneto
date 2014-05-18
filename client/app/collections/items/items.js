define(function(require){

	//Deps

	Backbone             = require( 'backbone' ),
	Helper               = require( 'helper' ),
	
	MasterBaseCollection = require( 'collections/masterbasecollection' ),
	Model                = require( 'models/items/item' );


	return MasterBaseCollection.extend({

		model : Model,

		parse: function( response ){
			return response.products;
		},

		search: function( ev, args ){
			this.reset();
			this.fetch( {
				dataType: "jsonp",
				url: Helper.queryBuilder( args )		
			} );
		}
		
	});
});