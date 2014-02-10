define(function(require){

	return {

		clickState: function( target, ev ){
			ev.stopPropagation();
			var				
			active = "active",	
			evType;
			target = $( target );
			
			if ( Modernizr.touch )
				evType = "touchstart";
			else
				evType = "click";		
			target.parent().removeClass( active );
			$( ev.target ).parent().addClass( active );
		},

		routeState: function( route ){
			if( route !== "route" ){
				if( ! App.page.current ){
				App.page.current = Backbone.history.fragment.split("/")[0];
				} else {
					//Save previous value and iterate to current
					App.page.previous = App.page.current;
					App.page.current  = Backbone.history.fragment.split("/")[0];

					//If the values are identical then identical = TRUE
					if( App.page.previous === App.page.current ){
						App.page.identical = true;
					} else {
						App.page.identical = false;
					}
				}
			}
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
		}

	};
});