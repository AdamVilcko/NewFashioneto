define(function(require){

	var MasterBaseModel = require( "models/masterbasemodel" );

	return MasterBaseModel.extend({

		init: function(){
			App.vent.on( "items:updateLikes", this.update, this );			
		},

		update: function( collection ){
			var model = collection.get( this.get( "id" ) );
			if( model ){
				this.set( model.get( "likes" ) );
			}
		}

	});

});