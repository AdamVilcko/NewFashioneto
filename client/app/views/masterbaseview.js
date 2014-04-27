define(function(require){

	var
	Backbone   = require("backbone"),
	Handlebars = require("handlebars"),
	$          = require("jquery"),
	Helper     = require('helper');

	return Backbone.View.extend({

		initialize: function( options ){
			this.options = options || {};
			if( this.options.master ){
				this.master = this.options.master;
				if( typeof this.master.data ) this.data = this.master.data;
			}
			this.$el.attr( "data-view", this.cid );
			if( typeof this.init !== "undefined" ) this.init( options );
			if( typeof this.initSubviews !== "undefined" ) this.initSubviews();
		},

		render: function(){
			this.$el.html( this.template() );
			return this;
		},

		renderToDom: function(){
			var el = $( this.tagName + "[data-view=" + this.cid + "]" );
			el.replaceWith( this.render().el );
		},

		close: function(){
			this.remove();
		},

		data: {},

		merge: function( data ){
			data = data || {};
			data.details = this.data.details;
			return data;
		}



	});

});