define(function(require){

	var
	MasterBaseView = require( 'views/masterbaseview' ),
	Handlebars     = require("handlebars"),
	template       = require("text!templates/photos/album-thumbnail.hbr")
	PhotoModal     = require('views/photos/photo-modal');

	return MasterBaseView.extend({
		template: Handlebars.compile(template),
		init: function(){

		},
		events:{
			"click": function(){
				new PhotoModal( {
					model : this.model,
					//Add comments collection property and instaitate in init as prop then pass here
				} );
			}
		}
	});

});