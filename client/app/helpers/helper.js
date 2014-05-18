define(function(require){

	Moment    = require("moment"),
	LiveStamp = require("jquery.livestamp"),
	_ = require("_");

	return {

		navState: function( pageId, tab ){
			var
			navAnchors = $( ".nav a" ),
			active     = "active",
			href;

			navAnchors.parent().removeClass( active );

			if( pageId === "guestprofile" ) pageId = "people"; // Bodge to make people still highlight even though id name is guestprofile

			navAnchors.each( function( i ){
				href = $(this).attr( "href" );
				if( href === "#" + pageId || href === "#" + pageId + "/" + tab ){
					$(this).parent().addClass( active );
				}
			} );

		},

		toggleMobileNav: function( ev ){
			var
			el         = $( ev.target ),
			state      = el.data( 'toggle' ),
			targetName = el.data( 'target' ),
			target     = $( targetName );

			if( state === "collapse" ){
				$( target ).
				slideDown( 200 );
				el.data( 'toggle', 'uncollapse' );
			} else {
				$( target ).
				slideUp( 200 );
				el.data( 'toggle', 'collapse' );
			}
		},

		processDate: function(){
			this.$el.find('.date')
			.livestamp( this.model.get( "date" ) )
			.attr( "title", Moment.unix( this.model.get( "date" ) ).format() );
		},

		createImageUrl: function( data ){
			data.details.image = {};
			data.details.image.thumbnail = App.url( "image" ) + "THUMBNAIL/" + data.details.imageId;
			data.details.image.small = App.url( "image" ) + "SMALL/" + data.details.imageId;
			data.details.image.standard = App.url( "image" ) + "STANDARD/" + data.details.imageId;
			return data;
		},

		queryBuilder: function( args ){
            var
            args = args || {},
            root     = "http://api.shopstyle.com/action/apiSearch?",
            defaults = {
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

            args = _.extend( defaults, args );

            function build(){
                var string = root;
                _.each( args, function( value, key, list ){
                    if( _.isObject( value ) ){
                    	_.each( value, function( value, key, list ){
                    		if( _.isString( value ) ){
                    			string += "fl=" + key + value + "&";
                    		}  		
                    	} );
                    } else {
                    	string += key + "=" + value + "&";
                    } 
                } );
				return string;
            };
            return build();
        }

	}
});