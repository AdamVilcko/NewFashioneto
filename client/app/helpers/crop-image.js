(function (factory) {
  if (typeof define === "function" && define.amd) {
    define(["jquery"], factory);
  } else {
    factory(jQuery);
  }
})(function ($) {

  "use strict";

  var log = function (o) {
        try {
          console.log(o)
        } catch (e) {}
      };

  function CropAvatar($element) {
    this.$container = $element;


    this.$avatarUpload = this.$avatarForm.find(".image-upload");
    this.$avatarSrc = this.$avatarForm.find(".image-src");
    this.$avatarData = this.$avatarForm.find(".image-data");
    this.$avatarInput = this.$avatarForm.find(".image-input");

    this.$avatarWrapper = this.$avatarModal.find(".image-wrapper");

    this.init();
    log('>>>>>>');
    log(this);
  }

  CropAvatar.prototype = {
    constructor: CropAvatar,

    support: {
      fileList: !!$("<input type=\"file\">").prop("files"),
      fileReader: !!window.FileReader,
      formData: !!window.FormData
    },

    init: function () {
      this.support.datauri = this.support.fileList && this.support.fileReader;
      this.addListener();
    },

    addListener: function () {
      this.$avatarInput.on("change", $.proxy(this.change, this));
    },

    change: function () {
    	console.log('change');
      var files,
          file;

      if (this.support.datauri) {
        files = this.$avatarInput.prop("files");

        if (files.length > 0) {
          file = files[0];

          if (this.isImageFile(file)) {
            this.read(file);
          }
        }
      } else {
        file = this.$avatarInput.val();

        if (this.isImageFile(file)) {
          this.syncUpload();
        }
      }
    },

    isImageFile: function (file) {
      if (file.type) {
        return /^image\/\w+$/.test(file.type);
      } else {
        return /\.(jpg|jpeg|png|gif)$/.test(file);
      }
    },

    read: function (file) {
      var _this = this,
          fileReader = new FileReader();

      fileReader.readAsDataURL(file);

      fileReader.onload = function () {
        _this.url = this.result
        _this.startCropper();
      };
    },

    startCropper: function () {
      var _this = this;

      if (this.active) {
        this.$img.cropper("setImgSrc", this.url);
      } else {
        this.$img = $('<img src="' + this.url + '">');
        this.$avatarWrapper.empty().html(this.$img);
        this.$img.cropper({
          aspectRatio: 1,
          preview: this.$avatarPreview.selector,
          done: function (data) {
            var json = [
                  '{"x":' + data.x,
                  '"y":' + data.y,
                  '"height":' + data.height,
                  '"width":' + data.width + "}"
                ].join();

            _this.$avatarData.val(json);
          }
        });

        this.active = true;
      }
    },

    stopCropper: function () {
      if (this.active) {
        this.$img.cropper("disable");
        this.$img.data("cropper", null).remove();
        this.active = false;
      }
    },

     syncUpload: function () {
      this.$avatarSave.click();
    },

  };

  $(function () {
    var example = new CropAvatar($("#crop-image"));
  });
});
