define(function(require){

	MasterBaseCollection = require( 'collections/masterbasecollection' ),
	Model                = require( 'models/comments/comment' );


	return MasterBaseCollection.extend({
		model : Model,
        init:function(){
            this.url = App.api.get( "wall" ) + "/" + this.options.contextId + "/" + this.options.parentId;
        }
	});
});