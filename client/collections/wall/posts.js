define(function(require){

	//Deps

	Backbone     = require( 'backbone' );

	//Model

	Model = require( 'models/wall/post' );


	return Backbone.Collection.extend({
		model : Model
	});
});