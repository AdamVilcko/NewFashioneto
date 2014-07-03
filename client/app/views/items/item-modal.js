define(function(require){

	var

	Handlebars = require("handlebars"),
	$          = require("jquery"),
	Helper     = require('helper'),
	Bootstrap  = require('bootstrap'),

	ModalView  = require('components/modal'),	
	template = require('text!templates/items/item-modal.hbr');


	return ModalView.extend({

		contextId: "item",
		id: "itemModal",
		className: "modal fade",
		template: Handlebars.compile( template ),

		modalInit: function(){
			this.render();
			this.open();
		}		

	});

});

