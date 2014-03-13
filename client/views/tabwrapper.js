define(function(require){
	
	var
	Backbone   = require("backbone"),
	Handlebars = require("handlebars"),
	$          = require("jquery");

	return Backbone.View.extend({		

		initialize: function( options ){
			this.options = options || {};
			this.tab     = this.options.tab;

			//Add listen event for change tab
			

			//Check hash on load, if hash is active then render tab
			/*var tab = this.options.pageId + "/" + this.options.tabId;
			if( Backbone.history.fragment === tab ){
				this.render( {
					pageName: this.options.pageId,
					tab: this.options.tabId
				} );
			}*/
		},

		tabTo: function( data ){			
			if( data.pageName === this.options.pageId && data.tab === this.options.tabId || this.options.default ){
				this
				.render()
				.active     = true;
				} else {
				this.active = false;
			}
		},

		render: function(){
			this.$el.html( this.tab.render().el );
			return this;
		},

		active: false

	});

});