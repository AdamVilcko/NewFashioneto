window.App = {

    Models:{},
    Collections:{},
    Views:{},
    router:{},
    vent: null,
    
    page:{
        previous:null,
        current:null,
        identical: null
    },

    renderChain: {
        profile: [],
        items: [],
        people: []
    },

    content:{
        language:"EN-GB",
        title: "Fasioneto"
    }

};

var require = {
    
    paths: {

        "helper": "helpers/helper",
        "jquery": "lib/jquery-1.10.2",
        "jqueryui": "lib/jquery-ui-1.10.4.custom.min.js",
        "mootools": "lib/mootools-core-1.4.5-full",
        "backbone": "lib/backbone1.1.0",
        "_": "lib/underscore1.5.2",
        "bootstrap": "lib/bootstrap",
        "handlebars": "lib/handlebars-v1.1.2",
        "modernizr": "lib/modernizr",
        "class": "lib/mootools-class-1.4.5"
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

        modernizr :{
            exports : 'Modernizr'
        },

        _ : {
            exports : '_'
        },

        handlebars:{
            exports : 'Handlebars'
        },

        bootstrap : {
            deps : ['jquery']
        }

    }

};