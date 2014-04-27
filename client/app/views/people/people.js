define(function(require){

	var

	Collection   = require("collections/people/people"),
	Person       = require("views/people/person"),
	BasePageView = require("views/pages/basepageview");

	return BasePageView.extend({

		model: Person,

		init: function(){
			this.collection = new Collection();
		}

	});

});