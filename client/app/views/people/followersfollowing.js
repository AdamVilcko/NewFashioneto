define(function(require){

	var

	_              = require("_"),

	Collection     = require( "collections/people/people" ),
	Person         = require( "views/people/person" ),
	MasterBaseView = require( "views/masterbaseview" );


	return MasterBaseView.extend({

		modelView: Person,

		emptyCollectionTemplate: Handlebars.compile( "<div class='alert alert-info' style='text-align:center'>No people yet! (Sort it out</div>" ),

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