define(function(require){
	
	var
	Backbone   = require("backbone"),
	Handlebars = require("handlebars"),
	$          = require("jquery");

	return Backbone.View.extend({

		el: "#tabContainer",

		initialize: function(options){
			this.options = options || {};
			this.tab     = this.options.tab;
			this.tab.setElement( this.el );

			//Add listen event for change tab
			App.vent.on( "page:profile", this.render, this );

			//Check hash on load, if hash is active then render tab
			var tab = "profile/" + Backbone.history.fragment;
			if( this.options.hashId === tab ){
				this.render( tab );
			}			
		},

		render: function( tab ){
			if( this.options.hashId === tab ){				
				this.tab.render();		
			}
		}

	});

});