define(function(require){

	var
	Backbone       = require("backbone"),
	Handlebars     = require("handlebars"),
	$              = require("jquery"),

	Like           = require("views/like/like"),
	template       = require("text!templates/items/item.hbr"),
	MasterBaseView = require( 'views/masterbaseview' ),
	ItemModal = require('views/items/item-modal');


	return MasterBaseView.extend({

		template: Handlebars.compile( template ),

		className: "item thumbnail",

		contextId: "item",

		render: function(){
			var pic, width, height, imageData;
			MasterBaseView.prototype.render.call( this );
			console.log( this.model );
			
			imageData = this.model.get( "images" )[5];
			pic    = this.$el.find(".pic img");
			
			pic.css({
				height: imageData.height
			});

			return this;
		},

		events:{
			"click .btn": function(){
				new ItemModal();

			}
		}

	});

});