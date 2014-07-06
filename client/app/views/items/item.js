define(function(require){

	var
	Backbone       = require("backbone"),
	Handlebars     = require("handlebars"),
	$              = require("jquery"),

	Like           = require("views/like/like"),
	template       = require("text!templates/items/item.hbr"),
	MasterBaseView = require( 'views/masterbaseview' ),
	ItemModal      = require('views/items/item-modal');


	return MasterBaseView.extend({

		template: Handlebars.compile( template ),

		className: "item thumbnail",

		contextId: "item",

		render: function(){
			var pic, width, height, imageData;
			MasterBaseView.prototype.render.call( this );

			imageData = this.model.get( "image" ).sizes.Large;
			pic    = this.$el.find(".pic img");
			console.log(this.model.get( "image" ));

			pic.css({
				height: imageData.height
			});



			return this;
		},

		events:{
			"click .btn": function(){
				new ItemModal({
					model: this.model
				});
			}
		}

	});

});