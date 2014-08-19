define(function(require){

	var

	Handlebars = require("handlebars"),
	$          = require("jquery"),
	Helper     = require('helper'),
	Bootstrap  = require('bootstrap'),

	Comments   = require("views/comments/comments"),
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
			$(itemModal)
			.imagesLoaded()
			.progress( function( instance, image ) {
			  var result = image.isLoaded ? 'loaded' : 'broken';
			  $(image.img)
			  .addClass("loadIn");
			});

			this.comments = new Comments( {
				parentId: this.model.get( "id" ),
				parentType: "ITEM",
				el: this.$( ".comments" )
			} );

		}

	});

});

