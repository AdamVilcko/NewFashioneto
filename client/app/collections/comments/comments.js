define(function(require){

	MasterBaseCollection = require( 'collections/masterbasecollection' ),
	Model                = require( 'models/comments/comment' );


	return MasterBaseCollection.extend({
		model : Model,
		url : App.api.get( "comment" ),


		setUrl: function( options ){
			if(!this.urlHasSet){
				this.url = this.url + "/" + options.parentType + "/" + options.parentId;
				this.urlHasSet = true;
			}			
			return this;
		}
	});
});