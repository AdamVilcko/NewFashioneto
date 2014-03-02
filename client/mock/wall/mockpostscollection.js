define(function(require){

	return [
		{
			userName: "Caspidge",
			postContent: "Hello this is a post and it is on a wall!",
			comments: [
				{			
				    userName:"Bob",
				    postContent:"Thisdasdsaas is a post!",
				    date: new Date()
				},

				{			
				    userName:"Dave",
				    postContent:"This idsadasdass a post!",
				    date: new Date()
				},

				{			
				    userName:"Ian",
				    postContent:"This is a posdsdsdassdat!",
				    date: new Date()
				}
			]
		},
		{
			userName: "John",
			postContent: "Bla Bla Bla Bla Bla Bla Bla",
			comments: false
		},
		{
			userName: "Dave",
			postContent: "Random content on a wall bla bla bla bla.",
			comments: [
				{			
				    userName:"Bob",
				    postContent:"Thisdasdsaas is a post!",
				    date: new Date()
				},

				{			
				    userName:"Dave",
				    postContent:"This idsadasdass a post!",
				    date: new Date()
				},

				{			
				    userName:"Ian",
				    postContent:"This is a posdsdsdassdat!",
				    date: new Date()
				}
			]
		}
	];
});