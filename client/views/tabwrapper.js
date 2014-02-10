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
			App.renderChain[ this.options.pageId ].push( this );

			//Add listen event for change tab
			App.vent.on( "page:" + this.options.pageId, this.render, this );

			//Check hash on load, if hash is active then render tab
			var tab = this.options.pageId + "/" + this.options.tabId;
			if( Backbone.history.fragment === tab ){
				this.render( {
					pageName: this.options.pageId,
					tab: this.options.tabId
				} );
			}
		},

		render: function( evData ){
			//If the tab name matches the tab event OR if default is true
			if( this.options.tabId === evData.tab || this.options.default ){		
				this.tab.setElement( "#" + this.el.id ).render();
				this.active = true;
			} else {
				this.active = false;
			}
			return this;
		},

		active: false

	});

});