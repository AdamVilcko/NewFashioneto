root = "/ftest/as/";

App = {
    
    vent: null,

    content: {
        language:"EN-GB",
        title: "Fasioneto"
    },    

    rest: {
        wall: "comment/USER/1",
        like: "comment/like/1"
    },

    url: function( arg ){
        return root + this.rest[ arg ];
    }

}

require = {
    
    paths: {

        "helper": "helpers/helper",
        "jquery": "lib/jquery-1.10.2",
        "jqueryui": "lib/jquery-ui-1.10.4.custom.min",
        "mootools": "lib/mootools-core-1.4.5-full",
        "backbone": "lib/backbone1.1.0",
        "_": "lib/underscore1.5.2",
        "bootstrap": "lib/bootstrap",
        "handlebars": "lib/handlebars-v1.1.2",
        "modernizr": "lib/modernizr",
        "class": "lib/mootools-class-1.4.5",
        "jquery.masonry": "lib/jquery.masonry.min",
        "moment": "lib/moment-with-langs.min",
        "jquery.livestamp": "lib/livestamp"
        
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