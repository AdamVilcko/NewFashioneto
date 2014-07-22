define(function(require){

	var

	_              = require("_"),

	Collection     = require( "collections/people/people" ),
	Person         = require( "views/people/person" ),
	MasterBaseView = require( "views/masterbaseview" );

	return function(vOpts){
		var self = this, mOpts,

		View = MasterBaseView.extend({
			modelView: Person,
			emptyCollectionTemplate: Handlebars.compile( "<div class='alert alert-info' style='text-align:center'>No people yet! (Sort it out</div>" ),

			init: function(){
				this.collection = new Collection( this.options.data );
				this.render = this.renderPeople;
			},

			renderPeople: function(){
				this.renderCollection();
				_.defer( function(){
					self.masonry( '.people' );
				} );
				return this;
			}
		});

		mOpts = vOpts;
		_.extend( self, new View(vOpts) );
		return self;
	}

});