define(function(require){

	var

	Handlebars           = require("handlebars"),
	$                    = require("jquery"),
	Helper               = require('helper'),

	MasterBaseCollection = require( 'collections/masterbasecollection' ),
	MasterBaseModel      = require( 'models/masterbasemodel' ),
	MasterBaseView       = require('views/masterbaseview'),
	template             = require("text!templates/photos/photos-modal.hbr"),
	Bootstrap            = require('bootstrap');


	return MasterBaseView.extend({

		init: function(){
			this.back = _.last( App.history );
			this.modalInit();
		},

		open: function(){
			var self = this;
			$("body").append( this.el );
			$("#" + this.id)
			.modal()
			.on('hidden.bs.modal', function(){
				App.router.navigate( self.back.fragment );
				self.remove();
				App.history.push({
				    fragment : Backbone.history.fragment
				});
				$("#" + this.id).off('hidden.bs.modal');
				if( this.onModalClose ){
					this.onModalClose();
				}
			} );
		}

	});

});