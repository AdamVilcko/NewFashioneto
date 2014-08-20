define(function(require){

	var

	MasterBaseModel = require( "models/masterbasemodel" ),
	CommentsCollection = require("collections/comments/comments");

	return MasterBaseModel.extend({

		init: function(){
			var self = this;

			var commentsWrapper = this.get("commentsWrapper");
			if(commentsWrapper){
				var obj = {
					collection: new CommentsCollection( commentsWrapper.collection )
				};				
				self.set("commentsWrapper", obj);
			}
			
		}

	});

});