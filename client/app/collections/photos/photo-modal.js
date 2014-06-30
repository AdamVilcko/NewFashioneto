define(function(require){

	MasterBaseCollection = require( 'collections/masterbasecollection' ),
	MasterBaseModel      = require( 'models/masterbasemodel' ),
	photoModalMockData   = require('text!mockdata/photomodal.json');


	return MasterBaseCollection.extend({
		model : MasterBaseModel,
		url : App.api.get( "photoModal" ),
		init: function(){
			this.add( JSON.parse( photoModalMockData ) );
		}
	});
});