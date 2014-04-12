define(function(require){

	var
	Backbone   = require("backbone"),
	Handlebars = require("handlebars"),
	$          = require("jquery"),
	Helper     = require('helper');

	return Backbone.View.extend({

		initialize: function( options ){
			this.options = options || {};
			if( this.options.master ) this.master = this.options.master;
			this.$el.attr( "data-view", this.cid );
			if( typeof this.init !== "undefined" ) this.init( options );
		},

		render: function(){
			this.$el.html( this.template() );
		},

		renderToDom: function(){

			//Get current element type

			//Cache view element target in DOM
			var el = $( "div[data-view=" + this.cid + "]" );

			//Get contents of view el property to render - maybe using $.content()?

			//Render contents into cached el container
			//el.html();

		},

		close: function(){
			//Other close content here
			this.remove();
		}



	});

});