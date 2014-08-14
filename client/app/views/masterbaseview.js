define(function(require){

	var

	$            = require("jquery"),
	_            = require("_"),
	Backbone     = require("backbone"),
	Handlebars   = require("handlebars"),
	Helper       = require('helper'),
	ImagesLoaded = require("jquery.imageloaded"),
	$bridget     = require('jquery.bridget'),
	Masonry      = require("jquery.masonry");


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
			$.bridget( 'masonry', Masonry );
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
			options = options || {};
			if( collection ){
				this.$el.empty();
				if( ! collection.isEmpty() ){
					if( options.sort ){
						collection.sort();
					}
					collection.each( function( model ){
						options.model = model;
						this.renderModel( options );
					}, this );
				} else {
					if( this.emptyCollectionTemplate ){
						this.$el.html( this.emptyCollectionTemplate( this.merge() ) );
					}
				}
			}
			return this;
		},

		renderNewItems: function( collection, options ){
			options = options || {};
			collection = collection || this.collection;
			var arr = [];
			collection.each( function( model ){
				options.model = model;
				var modelView = new this.modelView( options );
				if(options.hidden){
					modelView.render().$el.addClass("invisible");
				}
				arr.push(modelView.render().el);
			}, this );
			return arr;
		},

		renderModel: function( options ){
			var modelView = new this.modelView( options );
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
			var self = this;
			self.masonryTarget = $( "#tabContainer" );
			var
			masonryDefaults,
			masonryOptions = masonryOptions || {};
			masonryDefaults = {
			  itemSelector: item,
			  gutterWidth: 100,
			  columnWidth: 300,
			  isFitWidth: true
			}
			masonryOptions = _.extend( masonryDefaults, masonryArgs );
			
			self.masonryTarget
			.masonry("destroy")

			self.masonryTarget
			.addClass("invisible")
			.empty()
			.html( this.renderNewItems( this.collection ) )
			.addClass( "masonryContainer" );
			setTimeout(function(){
				self.masonryTarget
				.masonry( masonryOptions );
				$( "#tabContainer" ).find(".item").removeClass("invisible");
				self.masonryTarget
				.imagesLoaded()
				.progress( function( instance, image ) {
				  var result = image.isLoaded ? 'loaded' : 'broken';
				  $(image.img)
				  .addClass("loadIn");
				});
				self.masonryTarget
				.removeClass("invisible");
			}, 600);
		},

		addItemsMasonry: function(elements){
			$( "#tabContainer" ).append( elements );
			setTimeout(function(){
				$( "#tabContainer" ).masonry( 'appended', elements );

				$( "#tabContainer" ).find(".item").removeClass("invisible");

				$( "#tabContainer" )
				.imagesLoaded()
				.progress( function( instance, image ) {
				  var result = image.isLoaded ? 'loaded' : 'broken';
				  $(image.img)
				  .addClass("loadIn");
				});
			}, 500);

		},

		bindData: function( model, options ){
			if( model ){
				this.model = model;
				if( _.isObject(options) && options.render ){
					this.renderToDom();
				}
			}
		},

		closeView: function(){

		},

		data: {}

	});

});
