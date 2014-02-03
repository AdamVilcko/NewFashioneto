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
		}

	};
});