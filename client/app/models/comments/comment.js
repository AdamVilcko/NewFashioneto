define(function(require){	

	Backbone = require( 'backbone' );

	return Backbone.Model.extend({
		defaults: {
            content: "Default content!"            
		}
	});
});