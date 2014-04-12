define(function(require){	

	Backbone = require( 'backbone' );

	return Backbone.Model.extend({

		initialize:function(){
			
		},


		defaults: {			
			content: "This is the default model!"			
		}
	});
});

/*defaults: {
			id: 1,
			date: 1393806426,
			content: "This is the default model!",
			userId: 2,
			userName: "John Doe2",
			likes: 0,
			commentsWrapper: {
	            count: 1,
	            collection: [
	              {
	                id: 2,
	                date: 1393806426,
	                content: "Thanks!",
	                userId: 1,
	                userName: "John Doe1",
	                likes: 0,
	                commentsWrapper: {
	                  count: 0,
	                  collection: []
	                }
	              }
	            ]
          	}
		}*/