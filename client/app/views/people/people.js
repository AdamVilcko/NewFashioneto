define(function(require){

	var
	Backbone   = require("backbone"),
	Handlebars = require("handlebars"),
	$          = require("jquery"),
	
	Collection = require("collections/people/people"),
	Person     = require("views/people/person"),
	
	ItemView   = require( 'views/itemview' );

	return ItemView.extend({

		item: Person,
		
		init: function(){
			this.collection = new Collection();
		}		

	});

});