define(function(require){

	var

	Backbone             = require( 'backbone' ),
	Helper               = require( 'helper' ),

	MasterBaseCollection = require( 'collections/masterbasecollection' );


	return MasterBaseCollection.extend({

		parse: function( raw ){
			return raw.brands;
		},

		init: function(){
			var self = this;

		},

		url: //Helper.queryBuilder( null, {api: "brand"} )

	});
});