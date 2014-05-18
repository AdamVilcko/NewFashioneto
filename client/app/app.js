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