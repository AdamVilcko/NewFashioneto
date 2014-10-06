define(function(require){

	var

	Backbone             = require( 'backbone' ),
	Helper               = require( 'helper' ),

	MasterBaseCollection = require( 'collections/masterbasecollection' ),
	ItemModel            = require( 'models/items/item' );


	return MasterBaseCollection.extend({

		model: ItemModel,

		url: App.api.get( "feed" ),

		init: function(){
			this.url = this.url + "/0" + "/100";
		},

		parse: function( data ){
			return data.collection;
		},

		fetch: function(){
			return MasterBaseCollection.prototype.fetch.apply( this, arguments );
		}

	});
});