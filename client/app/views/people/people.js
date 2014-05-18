define(function(require){

	var

	_              = require("_"),
	
	Collection     = require("collections/people/people"),
	Person         = require("views/people/person"),
	MasterBaseView = require("views/masterbaseview"),
	Imagesloaded   = require("jquery.imageloaded");


	return MasterBaseView.extend({

		modelView: Person,

		init: function(){
			this.collection = new Collection();
		}	

	});

});