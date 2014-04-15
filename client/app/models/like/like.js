define(function(require){

	var Backbone = require("backbone");

	return Backbone.Model.extend({

		url: App.url( "like" ),

		persist: function( id ){
			this.url = this.url + "/" + id;
			return this.save( null, {
				success: function(){

				}
			} );

		}


	});

});