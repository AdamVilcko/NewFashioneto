define(function(require){

	var


	MasterBaseView = require( 'views/masterbaseview' ),
	FeedCollection = require('collections/feed/feed'),
	ItemView       = require("views/feed/feed-item-view");


	return MasterBaseView.extend({

		modelView: ItemView,

		init: function(){
			this.collection  = new FeedCollection();
		}

	});

});