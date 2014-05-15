define(function(require){

	var
	Backbone   = require("backbone"),
	Handlebars = require("handlebars"),
	$          = require("jquery"),
	
	Collection = require("collections/items/items"),
	Item       = require("views/items/item"),
	ItemView   = require( 'views/itemview' );

	return ItemView.extend({

		ModelViewType: Item,
		
		CollectionType: Collection

	});

});