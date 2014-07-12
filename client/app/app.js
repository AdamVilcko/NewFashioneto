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
            if( arg === "root"){
                return this.root;
            }
            if( arg === "shopstyle" ){
                return this.shopstyle;
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
        items: "items",
        image: "image/raw/",
        like: "like",
        follow: "follow",
        photos: "images",
        upload: "image/upload",

        shopstyle: {
            product:{
                root: "http://api.shopstyle.com/api/v2/products?",
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
            },

            brand: {
                root: "http://api.shopstyle.com/api/v2/brands?",
                defaults:{
                    pid: "uid8569-24941587-78"
                }
            },

            catagory: {
                root: "http://api.shopstyle.com/api/v2/categories?",
                defaults:{
                    format:"jsonp",
                    site: "www.shopstyle.co.uk",
                    pid: "uid8569-24941587-78",
                    cat: null,
                    depth: null
                }

            }


        }

    },

    constants: {

    }

}