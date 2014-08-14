define(function(require){

	//Deps

	MasterBaseCollection = require( 'collections/masterbasecollection' ),
	PhotoModel                = require( 'models/photos/photo' );


	return MasterBaseCollection.extend({
		model : PhotoModel,
		url : App.api.get( "photos" ),
		fetchDetails: function( model ){
			return this.fetch({
				url: this.url + "/" + model.id
			});
		}
	});
});