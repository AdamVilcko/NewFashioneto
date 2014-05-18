define(function(require){

	var

	$            = require("jquery"),
	Backbone     = require("backbone"),
	Handlebars   = require("handlebars"),
	Helper       = require('helper')
	ImagesLoaded = require("jquery.imageloaded");


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
			this.domEl = this.tagName + "[data-view=" + this.cid + "]";
		},

		render: function(){
			if( typeof this.preRender !== "undefined" ) this.preRender();
			if( this.template ){ this.$el.html( this.template( this.merge() ) ); }
			else if( this.label ) { this.$el.html( this.label );  }
			if( typeof this.postRender !== "undefined" ) this.postRender();
			return this;
		},

		renderToDom: function(){
			$( this.domEl ).replaceWith( this.render().el );
			return this;
		},

		renderCollection: function(){
			this.$el.empty();
			this.collection.each( this.renderModel, this );
			return this;
		},

		renderModel: function( model ){
			var modelView = new this.modelView( { model: model } );
			this.$el.append( modelView.render().el );
			return this;
		},

		renderTemplate: function(){
			this.$el.html( this.template( this.merge() ) );
			return this;
		},

		merge: function( data ){
			data = data || {};
			if( this.model ) data.model = this.model.toJSON();
			data.user        = App.user.toJSON();
			data.locale      = App.locale;
			data.viewContext = this;
			return data;
		},

		masonry: function( item ){
			var target = this.$( "#tabContainer" );
			target
			.empty()			
			.html( this.renderCollection().el )
			.addClass( "masonryContainer" );
			target.imagesLoaded( function(){
				setTimeout( function(){
					target
					.masonry({
					  itemSelector: item,
					  gutterWidth: 25,
					  isFitWidth: true
					});
					$( item )
					.each( function( i ){
						$(this).delay( i * 25 ).animate( { opacity: 1 }, 1200 );
					} );
				}, 1000 );
			} );
		},

		data: {}

	});

});