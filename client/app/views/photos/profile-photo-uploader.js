define(function(require){

	var
	Handlebars = require( "handlebars" ),
	$          = require( "jquery" ),
	
	Cropper    = require( 'jquery.cropper' ),	
	ModalView  = require( 'components/modal' ),
	template   = require( 'text!templates/photos/uploader-modal.hbr' );


	return ModalView.extend({

		contextId: "image",
		id: "profilePhotoUploader",
		className: "modal fade viewingPhoto",
		template: Handlebars.compile( template ),

		modalInit: function(){
			this.render();
			this.open();
		}

	});

});