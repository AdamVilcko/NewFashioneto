define(function(require){

	var

	MasterBaseModel = require( "models/masterbasemodel" );

	return MasterBaseModel.extend({
		url: App.api.get("items"),
		getMeta: function(){
			
			return this.fetch({
				data: JSON.stringify( [this.get("id")] ),
				method:"POST",
				contentType: "application/json"				
			});
			
		}		

	});

});