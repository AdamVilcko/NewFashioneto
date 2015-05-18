define(function (require) {

	var

	Handlebars = require("handlebars"),
	$          = require("jquery"),
	Helper     = require('helper'),

	ModalView  = require('components/modal'),
	Comments   = require("views/comments/comments"),
	template   = require("text!templates/photos/uploader-modal.hbr"),
	Bootstrap  = require('bootstrap'),

	jQueryFileUploader = require('jquery.fileupload');
	jQueryIframeTransport = require('jquery.iframe-transport');
	jQueryUIWidget = require('jquery.ui.widget');

	return function(aOptions){

		var self = this,

		View = ModalView.extend({

			id: "uploaderModal",
			className: "modal fade",
			template: Handlebars.compile( template ),

			modalInit: function(){
				this.render();
				this.open();			
				    
			    var url = App.api.get("profileupload");
			},
			
			upload: function() {
				$.ajax({
					type: "POST",
					context: this,
					url: App.api.get( 'profileupload' ),
					data: encodeURIComponent(this.$('#uploadCroppedImg').attr('src')),
					success: function(data) {
						self.options.collection.add({
							id: JSON.parse(data).id
			        	});
						var message = '<div class="picture thumbnail" href="#"><img src="' + App.api.get("image") + 'WALL/' + JSON.parse(data).id + '" /></div>'
			            $('#profilePhoto').html(message);
					},
						error: function( jqXHR, textStatus, errorThrown ){
							alert( jqXHR.status + ": " + errorThrown  );
					}

				});
			},

			events:{
				"click .button-container button": function(){
					self.$el.modal("hide");
				},
				"click #save": "upload"
				
			}

		});

		return _.extend( self, new View(aOptions) );

	}	 

});