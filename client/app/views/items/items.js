define(function(require){

	var
	Backbone       = require("backbone"),
	Handlebars     = require("handlebars"),
	$              = require("jquery"),
	
	Collection     = require("collections/items/items"),
	Item           = require("views/items/item"),
	MasterBaseView = require( 'views/masterbaseview' );

	return MasterBaseView.extend({

		init: function(){
			this.collection = new Collection([
				{
					id: 1,
					itemTitle: "Cool shorts",
					itemMaker: "Carhartt",
				},

				{
					id: 2,
					itemTitle: "Jeans",
					itemMaker: "Levi",
				},

				{
					id: 3,
					itemTitle: "Top",
					itemMaker: "Uniqlo",
				},

				{
					id: 4,
					itemTitle: "Jacket"					
				}
			]);
		},

		render: function(){
			this.$el.empty();
			this.collection.each( this.renderItem, this );
			return this;
		},

		renderItem: function( item ){
			var itemView = new Item( { model: item } );
			this.$el.append( itemView.render().el );
		}

	});

});