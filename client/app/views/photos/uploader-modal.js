define(function (require){

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

	return ModalView.extend({

		id: "uploaderModal",
		className: "modal fade",
		template: Handlebars.compile( template ),

		modalInit: function(){
			this.render();
			this.open();			
			    
		    var url = App.api.get("upload");

		    $('#fileupload').fileupload({
		        url: url,
		        dataType: 'json',
		        send: function (e, data) {
//			        	alert('I am sending');
		        },
		        done: function (e, data) {
		        	$('#buttons-and-things').hide();
		        	var message = '<p/><img src="' + App.api.get("image") + 'THUMBNAIL/' + data.result.id + '" />'
		        	message = message + 'Uploaded successfully! Now refresh this page and don\'t complain!';
		            $('#files').html(message);
		        },
		        progressall: function (e, data) {
		            var progress = parseInt(data.loaded / data.total * 100, 10);
		            $('#progress .progress-bar').css(
		                'width',
		                progress + '%'
		            );
		        }
//			    });
		    }).prop('disabled', !$.support.fileInput)
		        .parent().addClass($.support.fileInput ? undefined : 'disabled');
			
		}

	});

});

