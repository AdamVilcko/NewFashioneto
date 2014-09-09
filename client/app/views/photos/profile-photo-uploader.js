define(function(require){

	var
	Handlebars = require( "handlebars" ),
	$          = require( "jquery" ),
	
	Cropper    = require( 'jquery.cropper' ),
	//ImagePreview = require('jquery.fileupload-image'),
	ModalView  = require( 'components/modal' ),
	template   = require( 'text!templates/photos/profile-uploader-modal.hbr' );


	return ModalView.extend({

		contextId: "image",
		id: "uploaderModal",
		className: "modal fade viewingPhoto",
		template: Handlebars.compile( template ),

		modalInit: function(){
			this.render();
			this.open();			
			    
		    var url = App.api.get("upload");

		    $('#fileupload').fileupload({
		    	autoUpload: false,
		        url: url,
		        dataType: 'json',
		        previewMaxWidth: 100,
		        previewMaxHeight: 100,
		        previewCrop: true,
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
			.on('fileuploadadd', function (e, data) {
		        data.context = $('<div/>').appendTo('#files');
		        $.each(data.files, function (index, file) {
		            var
		            node = $('<p/>')
		            .append( file.preview )
		            .append($('<span/>').text(file.name));
		            node.appendTo(data.context);
		        });
		    })
		    .prop('disabled', !$.support.fileInput)
		    .parent().addClass($.support.fileInput ? undefined : 'disabled');			
		}

	});

});