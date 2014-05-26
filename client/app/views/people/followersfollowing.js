define(function(require){

	var

	_              = require("_"),

	Collection     = require( "collections/people/people" ),
	Person         = require( "views/people/person" ),
	MasterBaseView = require( "views/masterbaseview" );


	return MasterBaseView.extend({

		modelView: Person,

		emptyCollectionTemplate: Handlebars.compile( "<h1 style='text-align:center'>No people yet!</h1><p style='text-align:center'>(Sort it out)</p>" ),

		init: function(){
			this.collection = new Collection();
			App.vent.on( "profile:dataLoaded", this.update, this );
			this.render = this.renderPeople;
		},

		update: function( data ){
			this.collection.reset( data.get( this.options.type ).collection );
		},

		renderPeople: function(){
			
			this.renderCollection();
			var self = this;
			_.defer( function(){
				self.masonry( '.people' );
			} );
			
			return this;			
		}

	});

});