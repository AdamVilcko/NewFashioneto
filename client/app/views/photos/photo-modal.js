define(function(require){

	var

	Handlebars     = require("handlebars"),
	$              = require("jquery"),
	Helper         = require('helper'),

	MasterBaseView = require('views/masterbaseview'),
	Like           = require("views/like/like"),
	template       = require("text!templates/photos/photos-modal.hbr")
	Bootstrap      = require('bootstrap');


	return MasterBaseView.extend({

		contextId: "photo",
		id: "photoModal",
		className: "modal fade viewingPhoto",
		template: Handlebars.compile( template ),

		init: function(){
			this.render();


		},

		postRender: function(){
			$("body").append( this.el );
			$("#photoModal")
			.modal()
			.on('hidden.bs.modal', this.close);
			return this;
		},

		close: function(){
			this.remove();
		}

	});

});