define(function(require){

	//Depss

	MasterBaseCollection = require( 'collections/masterbasecollection' ),
	Model                = require( 'models/masterbasemodel' );


	return MasterBaseCollection.extend({
		model : Model,
		url : App.api.get( "photos" ),
		fetchDetails: function( model ){
			return this.fetch({
				url: this.url + "/" + model.id
			});
		}
	});
});