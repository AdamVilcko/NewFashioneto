define(function(require){
	
	var
	Backbone   = require("backbone"),
	Handlebars = require("handlebars"),
	$          = require("jquery");

	return Backbone.View.extend({

		el: "#tabContainer",

		initialize: function( options ){
			this.options = options || {};
			this.tab     = this.options.tab;
			this.tab.setElement( this.el );

			//Register render chain
			App.renderChain.profile.push( this );

			//Add listen event for change tab
			App.vent.on( "page:profile", this.render, this );

			//Check hash on load, if hash is active then render tab
			var tab = "profile/" + this.options.hashId;
			if( Backbone.history.fragment === tab ){
				this.render( {
					pageName: "profile",
					tab: tab
				} );
			}
		},

		render: function( evData ){
			if( this.options.hashId === evData.tab ){				
				this.tab.setElement( "#" + this.el.id ).render();
			}
		},

		active: false

	});

});