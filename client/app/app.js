window.App =

{

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

        get: function( arg, contextId ){
            if( arg === "thirdparty" ){
                return this.shopstyle.products;
            }
            if( contextId ){
                contextId = contextId + "/";
            } else {
                contextId = "";
            }

            return this.root + contextId + this[ arg ];
        },

        root: "/Fashioneto-0.1b/as/",
        user: "user",
        login: "user/authenticate",
        wall: "comment/USER",
        wallComments: "comment/COMMENT",
        people: "people/",
        items: "item/s",
        image: "image/",
        like: "like",
        follow: "follow",

        shopstyle: {
            products:{
                root: "http://api.shopstyle.com/action/apiSearch?",
                defaults:{
                    format:"jsonp",
                    site: "www.shopstyle.co.uk",
                    pid: "uid8569-24941587-78",
                    fts: null,
                    count: null,
                    prodid: null,
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