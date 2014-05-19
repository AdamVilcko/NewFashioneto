define(function(require){

	var MasterBaseModel = require( "models/masterbasemodel" );

	return MasterBaseModel.extend({

		url: App.api.get( "like" ),

		init: function(){
			//Doesn't discriminate between non-item likes, shouldn't
			//matter though as they won't be in view/instantiated at the time
			App.vent.on( "items:metaSynced", this.update, this );
		},

		update: function( collection ){
			var model = collection.get( this.get( "id" ) );
			if( model ){
				this.set( model );
			}
		}

	});

});