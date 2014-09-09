require = {

    paths: {

        "views": "views",
        "models": "models",
        "collections": "collections",
        "templates": "templates",

        "helper": "helpers/helper",
        "jquery": "../lib/jquery-1.10.2",
        "jqueryui": "../lib/jquery-ui-1.10.4.custom.min",
        "backbone": "../lib/backbone1.1.0",
        "_": "../lib/underscore1.5.2",
        "bootstrap": "../lib/bootstrap",
        "handlebars": "../lib/handlebars-v1.1.2",
        "modernizr": "../lib/modernizr",
        "jquery.masonry": "../lib/jquery.masonry.min",
        "moment": "../lib/moment-with-langs.min",

        "jquery.cropper": "../lib/cropper",
        "jquery.livestamp": "../lib/livestamp",
        "jquery.cookie": "../lib/jquery.cookie",
        "jquery.transit": "../lib/jquery.transit",
        "jquery.imageloaded" : "../lib/imagesloaded.pkgd.min",
        "jquery.masonryImagesReveal" : "../lib/masonryImagesReveal",
        "jquery.bridget": "../lib/jquery.bridget",
        
        "jquery.fileupload": "../lib/jqueryuploader/jquery.fileupload",
        "jquery.iframe-transport": "../lib/jqueryuploader/jquery.iframe-transport",
		"jquery.ui.widget": "../lib/jqueryuploader/vendor/jquery.ui.widget",

		//Add the rest of the image stuff here
		//"load.image": "../lib/jqueryuploader/"
		//"jquery.fileupload-image": "../lib/jqueryuploader/jquery.fileupload-image",

    }, 

    shim:{

        backbone : {
            deps : [ '_', 'jquery' ],
            exports : 'Backbone'
        },

        jquery : {
            exports : '$'
        },

        jqueryui:{
            deps: ['jquery']
        },

        "jquery.masonry": ['jquery'],
        "jquery.livestamp": ['jquery'],
        "jquery.cookie": ['jquery'],
        "jquery.transit": ['jquery'],
        "jquery.imageloaded": ['jquery'],
        "jquery.bridget": ['jquery'],
        "jquery.masonryImagesReveal": ['jquery', "jquery.imageloaded" ],

        "jquery.fileupload-image": ['jquery'],
        "jquery.iframe-transport": ['jquery'],
        "jquery.fileupload-ui": ['jquery'],



        jqueryui: ['jquery'],

        bootstrap : ['jquery'],

        modernizr :{
            exports : 'Modernizr'
        },

        _ : {
            exports : '_'
        },

        handlebars:{
            exports : 'Handlebars'
        }

    }

}