define(function(require){
	
	var
	Backbone   = require("backbone"),
	Handlebars = require("handlebars"),
	$          = require("jquery");

	return Backbone.View.extend({	

		el:"#main",

		renderChain: function( evData ){

			if( evData.pageName !== App.page.current ){
				this.$el.html( this.template() );
				
				// At the moment this is just for profile!!! This needs to be made generic for all page types
				for( var i = 1; i < App.renderChain.profile.length; i++ ){					
					var childView = App.renderChain.profile[i];
					if( typeof childView.hashId !== "undefined" ){
						if ( childView.hashId === evData.tab ){
							childView.render( evData );						
						}
					} else {
						childView.render( evData );
					}
				}
			}
			return this;
		}

	});

});