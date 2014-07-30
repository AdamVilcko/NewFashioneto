define(function(require){

	Handlebars         = require( "handlebars" ),
	Helper             = require( "helper" ),
	DocumentModel      = require( "backbone.documentmodel" ),

	//Collections
	Posts = require('collections/wall/posts'),
	AlbumPhotos = require('collections/photos/album-photos'),
	Items = require('collections/items/meta'),
	Comments = require('collections/comments/comments'),
	People = require('collections/people/people'),

	//Likes
	Like = require('models/like/like');

	var Schema = {
		commentsWrapper: {
			collection: Posts
		},
		followersWrapper: {
			collection: People
		},
		followingWrapper: {
			collection: People
		},
		imagesWrapper:{
			collection: AlbumPhotos
		},
		itemsWrapper:{
			collection: Items
		}
	};

	Profile = Backbone.DocumentModel.extend({

	    // For models
	    getNestedModel: function (nestedKey, nestedValue, nestedOptions) {
	        switch (nestedKey) {
	        	default:
	                return new Backbone.DocumentModel(nestedValue, nestedOptions);
	        }
	    },

	    // For collections
	    getNestedCollection: function (nestedKey, nestedValue, nestedOptions) {
	        switch (nestedKey) {
	            case 'commentsWrapper.collection':
	                return new Schema.commentsWrapper.collection(nestedValue, nestedOptions);
	            break;
	            case 'followersWrapper.collection':
	                return new Schema.followersWrapper.collection(nestedValue, nestedOptions);
	            break;
	            case 'followingWrapper.collection':
	                return new Schema.followingWrapper.collection(nestedValue, nestedOptions);
	            break;
	            case 'imagesWrapper.collection':
	                return new Schema.imagesWrapper.collection(nestedValue, nestedOptions);
	            break;
	            case 'itemsWrapper.collection':
	                return new Schema.itemsWrapper.collection(nestedValue, nestedOptions);
	            break;
	            default:
	                return new Backbone.DocumentCollection(nestedValue, nestedOptions);
	        }
	    }
	});

	return Profile;

});