define(function(require){

	var

	Backbone             = require( 'backbone' ),
	Helper               = require( 'helper' ),

	MasterBaseCollection = require( 'collections/masterbasecollection' ),
	Model                = require( 'models/items/item' );


	return MasterBaseCollection.extend({

		model : Model,

		parse: function( response ){
			this.total = response.total;
			return response.products;
		},

		search: function( ev, args ){
			this.fts = args.fts;
			args.offset = 25;
			args.limit = 25;
			this.reset();
			return this.fetch( {
				dataType :"jsonp",
				url: Helper.queryBuilder( args, {api: "product"} )
			} );
		},

		loadMoreItems: function(){
			var args = {};
			this.offset = this.offset + 15;
			args.offset = this.offset;
			args.limit = 15;
			args.fts = this.fts;
			return this.fetch( {
				url: Helper.queryBuilder(args, {api: "product"}),
				add: true,
				remove: false,
				update: true
			} );
		},

		fetchById: function( args ){
			this.reset();
			return this.fetch( {
				dataType :"jsonp",
				url: Helper.queryBuilder( args, {api: "product"} )
			} );
		},

		offset:5,
		fts:null

	});
});