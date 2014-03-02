define(function(require){

	//Deps

	Backbone = require( 'backbone' );
	
	//Model
	
	Model    = require( 'models/comments/comment' );
	

	return Backbone.Collection.extend({
		model : Model
	});
});