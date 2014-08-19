define(function(require){

	var

	MasterBaseModel = require( "models/masterbasemodel" ),
	CommentsCollection = require("collections/comments/comments");

	return MasterBaseModel.extend({

		init: function(){

			//Comments
			var comments = this.get("commentsWrapper").collection;
			this.get("commentsWrapper").collection = new CommentsCollection(comments);
		}

	});

});