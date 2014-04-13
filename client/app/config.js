App = {

    vent: null,

    content: {
        language:"EN-GB",
        title: "Fasioneto"
    },

    root: "/Fashioneto-0.1b/as/",

    rest: {
        user: "user",
        login: "user/authenticate",
        wall: "comment/USER",
        wallComments: "comment/COMMENT",
        like: "comment/like"
    },

    url: function( arg ){
        return this.root + this.rest[ arg ];
    },

    pages:{},

    data: {
        myprofile:{},
        guestprofile:{},
        items:{},
        people:{}
    },

    user:{
        username:null,
        id:null
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
        "mootools": "../lib/mootools-core-1.4.5-full",
        "backbone": "../lib/backbone1.1.0",
        "_": "../lib/underscore1.5.2",
        "bootstrap": "../lib/bootstrap",
        "handlebars": "../lib/handlebars-v1.1.2",
        "modernizr": "../lib/modernizr",
        "class": "../lib/mootools-class-1.4.5",
        "jquery.masonry": "../lib/jquery.masonry.min",
        "moment": "../lib/moment-with-langs.min",
        "jquery.livestamp": "../lib/livestamp",
        "jquery.cookie": "../lib/jquery.cookie",
        "jquery.transit": "../lib/jquery.transit"

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