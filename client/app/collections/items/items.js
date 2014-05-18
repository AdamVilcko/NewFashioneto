define(function(require){

	//Deps

	Backbone             = require( 'backbone' ),
	Helper             = require( 'helper' ),

	MasterBaseCollection = require( 'collections/masterbasecollection' ),
	Model                = require( 'models/items/item' );


	return MasterBaseCollection.extend({

		model : Model,

		url : App.url( "content" ),

		parse: function( response ){
			return response.products;
		},

		search: function( ev, args ){
			this.reset();
			this.url = Helper.queryBuilder( args );
			this.fetch( {
				dataType: "jsonp"				
			} );

		}


		
	});
});