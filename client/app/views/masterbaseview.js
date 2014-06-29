define(function(require){

	var

	$            = require("jquery"),
	Backbone     = require("backbone"),
	Handlebars   = require("handlebars"),
	Helper       = require('helper'),
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

		renderCollection: function( collection, options ){
			collection = collection || this.collection || null;
			if( collection ){
				this.$el.empty();
				if( ! collection.isEmpty() ){
					if( options === "sort" ){
						collection.sort();
					}
					collection.each( this.renderModel, this );
				} else {
					if( this.emptyCollectionTemplate ){
						this.$el.html( this.emptyCollectionTemplate( this.merge() ) );
					}
				}
			}
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

		activate: function( el ){
			$( el )
			.find( "#tabContainer" )
			.html( this.render().el );
		},

		merge: function( data ){
			data                        = data || {};
			if( this.model ) data.model = this.model.toJSON();
			data.user                   = App.user.toJSON();
			data.locale                 = App.locale;
			data.options                = this.options;
			data.viewContext            = this;
			return data;
		},

		masonry: function( item, masonryArgs ){
			var
			masonryDefaults,
			target = $( "#tabContainer" ),
			masonryOptions = masonryOptions || {};
			masonryDefaults = {
			  itemSelector: item,
			  gutterWidth: 25,
			  isFitWidth: true
			}
			masonryOptions = _.extend( masonryDefaults, masonryArgs );
			target
			.masonry("destroy")
			.css({opacity:0})
			.empty()
			.html( this.renderCollection().el )
			.addClass( "masonryContainer" );
			setTimeout(function(){
				target
				.masonry( masonryOptions );
				target
				.imagesLoaded()
				.progress( function( instance, image ) {
				  var result = image.isLoaded ? 'loaded' : 'broken';
				  $(image.img)
				  .addClass("loadIn");
				});
				target
				.css({opacity:1});
			}, 600);
		},

		closeView: function(){

		},

		data: {}

	});

});