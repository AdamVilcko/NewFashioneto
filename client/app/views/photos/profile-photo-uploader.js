define(function(require){

	var
		Handlebars      = require( "handlebars" ),
		$               = require( "jquery" ),
		
		Cropper         = require( 'jquery.cropper' ),
		Fileupload      = require('jquery.fileupload'),
		FileuploadImage = require('jquery.fileupload-image'),
		
		//Add the rest of the image stuff here
		
		ModalView       = require( 'components/modal' ),
		template        = require( 'text!templates/photos/profile-uploader-modal.hbr' );
		

	return ModalView.extend({

		contextId: "image",
		id: "uploaderModal",
		className: "modal fade viewingPhoto",
		template: Handlebars.compile( template ),

		modalInit: function(){
			this.render();
			this.open();			
			    
		    var url = App.api.get("profileupload");

		    $('#fileupload').fileupload({
		    	//autoUpload: false,
		    	formData: [{
		    		name: "description",
		    		value: this.$('.uploaderDescription').val()
		    	}],
		        url: url,
		        dataType: 'json',
		        previewThumbnail: true,
		        disableImageResize: /Android(?!.*Chrome)|Opera/
            		.test(window.navigator.userAgent),
		        previewMaxWidth: "500",
		        previewMaxHeight: "600",
		        
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
		    })
		    .on('fileuploadprocessalways', function (e, data) {
		        var index = data.index,
		            file = data.files[index],
		            node = $(data.context),
		            container;
		        if (file.preview) {
		        	container = $("<div></div>")
		        		.addClass("modal-well")
		        		.html(file.preview);
		            node
		                .prepend('<br>')
		                .prepend(container);
		        }
		        if (file.error) {
		            node
		                .append('<br>')
		                .append($('<span class="text-danger"/>').text(file.error));
		        }
		        if (index + 1 === data.files.length) {
		            data.context.find('button')
		                .text('Upload')
		                .prop('disabled', !!data.files.error);
		        }
		    })
		    .prop('disabled', !$.support.fileInput)
		    .parent().addClass($.support.fileInput ? undefined : 'disabled');			
		}

	});

});