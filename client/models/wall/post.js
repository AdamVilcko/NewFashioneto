define(function(require){	

	Backbone = require( 'backbone' );

	return Backbone.Model.extend({
		defaults: {
		    userName: "Caspidge",
			postContent: "Hello this is a post and it is on a wall!",
			comments: false
		}
	});
});