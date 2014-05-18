App = {

    vent: null,
    pages:{},
    user:{},

    locale: {

        get: function( arg ){
            return this[ arg ];
        },

        language:"EN-GB",
        title: "Fasioneto",
        follow: "Follow"
    },

    api: {
        
        get: function( arg ){
            if( arg === "thirdparty" ){
                return this.shopstyle.products;
            }
            return this.root + this[ arg ];
        },

        root: "/Fashioneto-0.1b/as/",
        user: "user",
        login: "user/authenticate",
        wall: "comment/USER",
        wallComments: "comment/COMMENT",
        people: "people/",
        items: "items/",
        image: "image/",
        like: "comment/like",
        follow: "follow",
        
        shopstyle: {
            products:{
                root: "http://api.shopstyle.com/action/apiSearch?",
                defaults:{
                    fts: "default",
                    count: "",
                    format:"jsonp",
                    site: "www.shopstyle.co.uk",
                    pid: "uid8569-24941587-78",
                    filters:{
                        b : null, //brand
                        r : null, //retailer
                        p : null, //price
                        d : null, //sale
                        s : null, //size
                        c : null  //color
                    }
                }
            }
        }
        
    },

    constants: {

    }

}





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
        "jquery.livestamp": "../lib/livestamp",
        "jquery.cookie": "../lib/jquery.cookie",
        "jquery.transit": "../lib/jquery.transit",
        "jquery.imageloaded" : "../lib/imagesloaded.pkgd.min",
        "jquery.masonryImagesReveal" : "../lib/masonryImagesReveal"

    },

    shim:{

        backbone : {

            deps : [ '_', 'jquery' ],
            exports : 'Backbone',
            init: function(){
                if( !window.App.vent )
                    window.App.vent = this._.extend({}, this.Backbone.Events);
                }
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
        "jquery.masonryImagesReveal": ['jquery', "jquery.imageloaded" ],

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