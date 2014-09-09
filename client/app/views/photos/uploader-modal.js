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
				    
			    var url = App.api.get("upload");

			    $('#fileupload').fileupload({
			    	//autoUpload: false,
			        url: url,
			        dataType: 'json',
			        send: function (e, data) {
			        	$('.upload-browse, textarea, select').hide();
			        	$('#progress').show();
			        },
			        done: function (e, data) {

			        	//Add to collection
			        	self.options.collection.add({
			        		id: data.result.id
			        	});

			        	var message = '<img class="thumbnail center" src="' + App.api.get("image") + 'SMALL/' + data.result.id + '" />'
			        	message = message + '<p class="alert alert-info" style="text-align: center;">Uploaded successfully to album.</p>';
			            $('#files').html(message);
			            $('#progress').hide();
			        },
			        progressall: function (e, data) {
			            var progress = parseInt(data.loaded / data.total * 100, 10);
			            $('#progress .progress-bar').css(
			                'width',
			                progress + '%'
			            );
			        }

			    })
			    .prop('disabled', !$.support.fileInput)
			    .parent().addClass($.support.fileInput ? undefined : 'disabled');			
			},

			events:{
				"click .button-container button": function(){
					self.$el.modal("hide");
				}
			}

		});

		return _.extend( self, new View(aOptions) );

	}	 

});