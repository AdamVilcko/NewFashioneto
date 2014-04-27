define(function(require){

	var

	Collection   = require("collections/people/people"),
	Person       = require("views/people/person"),
	MasterBaseView = require("views/masterbaseview");

	return MasterBaseView.extend({

		model: Person,

		init: function(){
			this.collection = new Collection();
		}

	});

});