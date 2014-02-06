define(function(require){
	
	var
	Backbone   = require("backbone"),
	Handlebars = require("handlebars"),
	$          = require("jquery");

	return Backbone.View.extend({		

		el:"#main",

		renderChain: function(){
			if( ! App.page.identical ){
				this.$el.html( this.template() );

				// At the moment this is just for profile!!! This needs to be made generic for all page types
				for( var i = 1; i < App.renderChain.profile.length; i++ ){
					App.renderChain.profile[i].render();
				}
			}

		}

	});

});