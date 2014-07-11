define(function(require){

	var

	Handlebars = require("handlebars"),
	$          = require("jquery"),
	Helper     = require('helper'),

	ModalView  = require('components/modal'),
	Comments   = require("views/comments/comments"),
	template   = require("text!templates/photos/uploader-modal.hbr"),
	Bootstrap  = require('bootstrap'),

	jQueryFileUploader = require('jquery.fileupload');

	return ModalView.extend({

		id: "uploaderModal",
		className: "modal fade",
		template: Handlebars.compile( template ),

		modalInit: function(){
			this.render();
			
		    'use strict';
		    // Change this to the location of your server-side upload handler:
		    var url = window.location.hostname === 'blueimp.github.io' ?
		                '//jquery-file-upload.appspot.com/' : 'server/php/';
		    $('#fileupload').fileupload({
		        url: url,
		        dataType: 'json',
		        done: function (e, data) {
		            $.each(data.result.files, function (index, file) {
		                $('<p/>').text(file.name).appendTo('#files');
		            });
		        },
		        progressall: function (e, data) {
		            var progress = parseInt(data.loaded / data.total * 100, 10);
		            $('#progress .progress-bar').css(
		                'width',
		                progress + '%'
		            );
		        }
		    }).prop('disabled', !$.support.fileInput)
		        .parent().addClass($.support.fileInput ? undefined : 'disabled');
			
			this.open();
		}

	});

});

