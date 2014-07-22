define(function(require){

	var

	_               = require("_"),
	Helper               = require( 'helper' ),

	ItemsCollection = require( "collections/items/items" ),
	MetaCollection  = require( "collections/items/meta" ),

	ItemView        = require( "views/items/item" ),
	MasterBaseView  = require( "views/masterbaseview" );


	return function(vOpts){
		var self = this, mOpts,

		View = MasterBaseView.extend({
			modelView: ItemView,

			emptyCollectionTemplate: Handlebars.compile( "<div class='alert alert-info' style='text-align:center'>No items yet! (Come on, you're better than this)</div>" ),

			init: function(){
				this.collection     = new ItemsCollection();
				this.metaCollection = new MetaCollection();
			},

			activate: function( el, model ){
				Helper.loader( "#tabContainer" );
				this.metaCollection.reset( mOpts.itemsWrapper.collection );

				this.collection
				.fetchById( { prodid: _.pluck( items, "id" ) } )
				.done(function( collection ){
					self.masonry( '.item' );
					App.vent.trigger( "items:updateLikes", self.metaCollection );
				});
			}
		});


		mOpts = vOpts;
		_.extend( self, new View(vOpts) );
		return self;
	}

});