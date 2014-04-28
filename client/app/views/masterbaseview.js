define(function(require){

	var
	$          = require("jquery"),
	Backbone   = require("backbone"),
	Handlebars = require("handlebars"),
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
			return this;
		},

		renderCollection: function(){
			this.$el.empty();
			this.collection.each( this.renderModel, this );
			return this;
		},

		renderModel: function( model ){
			var modelView = new this.model( { model: model } );
			this.$el.append( modelView.render().el );
			return this;
		},

		close: function(){
			this.remove();
		},

		merge: function( data ){
			data = data || {};
			if( this.model ) data.model = this.model.toJSON();
			data.user = App.user.toJSON();
			data.content = App.content;
			return data;
		},

		data: {}

	});

});