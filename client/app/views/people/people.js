define(function(require){

	var
	Backbone       = require("backbone"),
	Handlebars     = require("handlebars"),
	$              = require("jquery"),

	Collection = require("collections/people/people"),
	Person = require("views/people/person"),
	
	MasterBaseView = require( 'views/masterbaseview' );

	return MasterBaseView.extend({

		init: function(){
			this.collection = new Collection([
				{
					id: 1,
					userName: "user1",
					displayName: "Felipe Tonon",
					location: "Rio, BR",
					imgUrl: App.url( "image") + "1"
				},
				{
					id: 2,
					userName: "user2",
					displayName: "Caspar S-S",
					location: "London, UK",
					imgUrl: App.url( "image") + "2"
				},
				{
					id: 3,
					userName: "user3",
					displayName: "Ondrej Winter",
					location: "Prague, CZ",
					imgUrl: App.url( "image") + "3"
				},

				{
					id: 4,
					userName: "user4",
					displayName: "Adam Amran",
					location: "Prague, CZ",
					imgUrl: App.url( "image") + "4"
				},
				{
					id: 5,
					userName: "user1",
					displayName: "Felipe Tonon",
					location: "Rio, BR",
					imgUrl: App.url( "image") + "1"
				},
				{
					id: 6,
					userName: "user2",
					displayName: "Caspar S-S",
					location: "London, UK",
					imgUrl: App.url( "image") + "2"
				},
				{
					id: 7,
					userName: "user3",
					displayName: "Ondrej Winter",
					location: "Prague, CZ",
					imgUrl: App.url( "image") + "3"
				},

				{
					id: 8,
					userName: "user4",
					displayName: "Adam Amran",
					location: "Prague, CZ",
					imgUrl: App.url( "image") + "4"
				},
				{
					id: 9,
					userName: "user1",
					displayName: "Felipe Tonon",
					location: "Rio, BR",
					imgUrl: App.url( "image") + "1"
				},
				{
					id: 10,
					userName: "user2",
					displayName: "Caspar S-S",
					location: "London, UK",
					imgUrl: App.url( "image") + "2"
				},
				{
					id: 11,
					userName: "user3",
					displayName: "Ondrej Winter",
					location: "Prague, CZ",
					imgUrl: App.url( "image") + "3"
				},

				{
					id: 12,
					userName: "user4",
					displayName: "Adam Amran",
					location: "Prague, CZ",
					imgUrl: App.url( "image") + "4"
				}
			]);
		},

		render: function(){
			this.$el.empty();
			this.collection.each( this.renderPerson, this );
			return this;
		},

		renderPerson: function( person ){
			var personView = new Person( { model: person } );
			this.$el.append( personView.render().el );
		}

	});

});