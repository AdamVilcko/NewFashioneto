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
			var el = $( this.tagname + "[data-view=" + this.cid + "]" );
			el.replaceWith( this.render().el );
		},

		close: function(){
			//Other close content here
			this.remove();
		}



	});

});