define(function(require){

	var

	Backbone        = require("backbone"),
	Handlebars      = require("handlebars"),
	$               = require("jquery"),
	
	MasterBaseView  = require( 'views/masterbaseview' ),
	ItemsCollection = require("collections/items/items"),
	MetaCollection  = require("collections/items/meta"),
	ItemView        = require("views/items/item");
	

	return MasterBaseView.extend({

		modelView: ItemView,

		init: function(){
			this.collection     = new ItemsCollection();
			this.metaCollection = new MetaCollection();
		}

	});

});