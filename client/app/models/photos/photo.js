define(function(require){

	var

	DocumentModel   = require( "backbone.documentmodel" ),
	MasterBaseModel = require( 'models/masterbasemodel' );

	Schema = {
		comments: require('collections/comments/comments'),
		imageDetails: MasterBaseModel,
		likes: require( 'models/like/like' )
	},

	schemaLoader = function ( Key,  Value,  Options ) {
		var obj;
		switch( Key ){
			case "commentsWrapper": new Schema.comments( Value.collection,  Options ); break;
			case "likes": new Schema.likes( Value,  Options ); break;
			default:  obj = new MasterBaseModel( Value,  Options ); break;
		}
		return obj;
	},

	Photo = Backbone.DocumentModel.extend({
	    getNestedModel: schemaLoader,
	    getNestedCollection: schemaLoader,
	    twat:"twat"
	});

	return Photo;

});