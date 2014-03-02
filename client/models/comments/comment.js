define(function(require){	

	Backbone = require( 'backbone' );

	return Backbone.Model.extend({
		defaults: {			
		    userName:"Bob",
		    postContent:"This is a post!",
		    date: new Date()
		}
	});
});