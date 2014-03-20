define(function(require){	

	Backbone = require( 'backbone' );

	return Backbone.Model.extend({
		defaults: {
		    id: 2,
            date: 1393806426,
            content: "Default content!",
            userId: 1,
            userName: "Default name",
            likes: 0,
		}
	});
});