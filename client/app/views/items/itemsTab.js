define(function(require){

	var

	_               = require("_"),
	Helper               = require( 'helper' ),

	ItemsCollection = require( "collections/items/items" ),
	MetaCollection  = require( "collections/items/meta" ),

	ItemView        = require( "views/items/item" ),
	MasterBaseView  = require( "views/masterbaseview" );


	return function(viewOptions){
		var self = this,

		View = MasterBaseView.extend({

			modelView: ItemView,

			emptyCollectionTemplate: Handlebars.compile( "<div class='alert alert-info' style='text-align:center'>No items yet! (Come on, you're better than this)</div>" ),

			init: function(){
				this.collection     = new ItemsCollection();
				this.metaCollection = new MetaCollection();
				App.vent.on( "profile:dataLoaded", this.update, this );
			},

			update: function( data ){

			},

			activate: function( el, model ){
				var items;

				Helper.loader( "#tabContainer" );

				items = model.get( "itemsWrapper" ).collection;
				this.metaCollection.reset( items );

				this.collection
				.fetchById( { prodid: _.pluck( items, "id" ) } )
				.done(function( collection ){
					self.masonry( '.item' );
					App.vent.trigger( "items:updateLikes", self.metaCollection );
				});

			}

		});

		_.extend( self, new View(viewOptions) );

		return self;

	}

});