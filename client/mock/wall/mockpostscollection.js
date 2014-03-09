define(function(require){

	return [
		{
			id: 1,
			date: 1393806426,
			content: "I like your pictures and your profile, man!",
			userId: 2,
			userName: "John Doe 1",
			likes: 0,
			commentsWrapper: {
	            count: 1,
	            collection: [
	              {
	                id: 2,
	                date: 1393806426,
	                content: "First comment",
	                userId: 1,
	                userName: "John Doe Comment",
	                likes: 0,	                
	              },
	              {
	                id: 3,
	                date: 1393806426,
	                content: "Second comment!",
	                userId: 1,
	                userName: "John Doe Comment",
	                likes: 0,	                
	              }
	            ]
          	}
		},

		{
			id: 2,
			date: 1393806426,
			content: "I like your pictures and your profile, man!",
			userId: 2,
			userName: "John Doe 2",
			likes: 0,
			commentsWrapper: false
		},

		{
			id: 3,
			date: 1393806426,
			content: "I like your pictures and your profile, man!",
			userId: 2,
			userName: "John Doe 3",
			likes: 0,
			commentsWrapper: {
	            count: 1,
	            collection: [
	              {
	                id: 2,
	                date: 1393806426,
	                content: "Thanks!",
	                userId: 1,
	                userName: "John Doe Comment",
	                likes: 0,
	                commentsWrapper: {
	                  count: 0,
	                  collection: []
	                }
	              }
	            ]
          	}
		}
		
	];
});