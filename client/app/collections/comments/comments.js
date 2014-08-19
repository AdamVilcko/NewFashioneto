define(function(require){

	MasterBaseCollection = require( 'collections/masterbasecollection' ),
	Model                = require( 'models/comments/comment' );


	return MasterBaseCollection.extend({
		model : Model,
		url : App.api.get( "comment" ),

		setUrl: function( options ){
			this.url = this.url + "/" + options.parentType + "/" + options.parentId;
			return this;
		}
	});
});