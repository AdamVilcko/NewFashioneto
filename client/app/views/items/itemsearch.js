define(function(require){

	var

	Backbone        = require("backbone"),
	Handlebars      = require("handlebars"),
	$               = require("jquery"),

	MasterBaseView  = require( 'views/masterbaseview' ),
	ItemsCollection = require("collections/items/items"),
	MetaCollection  = require("collections/items/meta"),
	BrandsCollection  = require("collections/items/brands"),
	ItemView        = require("views/items/item");


	return MasterBaseView.extend({

		modelView: ItemView,

		init: function(){
			this.collection     = new ItemsCollection();
			this.metaCollection = new MetaCollection();
			this.brandsCollection = new BrandsCollection();
		}

	});

});