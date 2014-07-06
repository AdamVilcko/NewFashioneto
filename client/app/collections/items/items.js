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
			this.total = response.total;
			return response.products;
		},

		search: function( ev, args ){
			this.fts = args.fts;
			args.offset = 25;
			args.limit = 25;
			this.reset();
			return this.fetch( {
				url: Helper.queryBuilder( args )
			} );
		},

		loadMoreItems: function(){
			var args = {};
			this.offset = this.offset + 25;
			args.offset = this.offset;
			args.limit = 25;
			args.fts = this.fts;
			return this.fetch( {
				url: Helper.queryBuilder(args),
				add: true,
				remove: false,
				update: true
			} );
		},

		fetchById: function( args ){
			this.reset();
			return this.fetch( {
				url: Helper.queryBuilder( args )
			} );
		},

		offset:5,
		fts:null

	});
});