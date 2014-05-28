define(function(require){

	Moment    = require("moment"),
	LiveStamp = require("jquery.livestamp"),
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

		queryBuilder: function( args ){
            var
			args     = args || {},
			root     = App.api.get( "thirdparty" ).root,
			defaults = App.api.get( "thirdparty" ).defaults;

            args = _.extend( defaults, args );

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

        }

	}
});