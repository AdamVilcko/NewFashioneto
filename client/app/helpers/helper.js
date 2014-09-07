define(function(require){

	_ = require("_");

	return {

		navState: function(){
			var
			hash       = window.location.hash,
			pageId     = hash.split( "#" )[1].split( "/" )[0],
			tab        = hash.split( "#" )[1].split( "/" )[2],
			navAnchors = $( ".nav a" ),
			active     = "active",
			wildCard   = hash.split( "/" )[1],
			href;

			navAnchors.parent().removeClass( active );

			if( ( pageId === "profile" || pageId === "people" ) && ! tab ) tab = "wall";
			if( pageId === "guestprofile" ) pageId = "people"; // Bodge to make people still highlight even though id name is guestprofile

			navAnchors.each( function( i ){
				href = $(this).attr( "href" );
				if( href === "#" + pageId || href === "#" + pageId + "/" + wildCard + "/" + tab ){
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
				show();
				el.data( 'toggle', 'uncollapse' );
			} else {
				$( target ).
				hide();
				el.data( 'toggle', 'collapse' );
			}
		},

		queryBuilder: function( args, options ){
            var
			args     = args || {},
			options  = options || {},
			root     = App.api.get( "shopstyle" )[options.api].root,
			defaults = App.api.get( "shopstyle" )[options.api].defaults;

            args = $.extend( true, {}, defaults, args );

            function build(){
                var string = root;
                _.each( args, function( value, key, list ){
                	if( ! _.isNull( value ) ){
                		if( _.isArray( value ) ){
	                    	_.each( value, function( element, index, list ){
	                    			string += key + "=" + element + "&";
	                    	} );
	                    } else if( _.isObject( value ) ) {
	                    	_.each( value, function( value, key, list ){
	                    		if( _.isString( value ) ){
	                    			string += "fl=" + key + value + "&";
	                    		}
	                    	} );
	                    } else {
	                    	string += key + "=" + value + "&";
	                    }
                	}
                } );
				return string;
            };

            return build();

        },

        loader: function( el, root ){
        	if( root ){
        		root
				.find( el )
				.html( '<div class="spinner-wave"><div></div><div></div><div></div><div></div></div>' );
			} else {
				$( el )
				.html( '<div class="spinner-wave"><div></div><div></div><div></div><div></div></div>' );
			}

        }

	}
});