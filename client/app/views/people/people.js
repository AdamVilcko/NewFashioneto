define(function(require){

	var

	Collection   = require("collections/people/people"),
	Person       = require("views/people/person"),
	MasterBaseView = require("views/masterbaseview");

	return MasterBaseView.extend({

		modelView: Person,

		init: function(){
			this.collection = new Collection();
		},

		masonry: function(){
			var
			target = $( "#tabContainer" );
			target.empty();
			target.html( this.renderCollection().el );
			target
			.addClass( "masonryContainer" )
			.masonry({
			  itemSelector: '.people',
			  gutterWidth: 25,
			  isFitWidth: true
			}).resize();
		}

	});

});