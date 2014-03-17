define(function(require){

	Moment     = require("moment"),
	LiveStamp = require("jquery.livestamp");

	return {

		navState: function( pageId, tab ){
			var
			navAnchors = $( ".nav a" ),
			active     = "active",
			href;
			
			navAnchors.parent().removeClass( active );

			navAnchors.each( function( i ){
				href = $(this).attr( "href" );				
				if( href === "#" + pageId || href === "#" + pageId + "/" + tab ){
					$(this).parent().addClass( active );
				}
			} );

			//Code to handle the link state properly
			//so that tab state is updated on the main links
			var profile = $( '.nav a.profile' );
			profile;

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
		}

	}
});