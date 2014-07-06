define(function(require){

	var

	$            = require("jquery"),
	Handlebars   = require("handlebars"),
	Helper       = require( 'helper' ),
	MasterBaseCollection = require( 'collections/masterbasecollection' ),

	ItemSearch   = require( "views/items/itemsearch" ),
	BasePageView = require("views/pages/basepageview"),
	pageTemplate = require("text!templates/pages/items.hbr");


	return BasePageView.extend({

		template: Handlebars.compile( pageTemplate ),

		pageId: "items",

		url: App.api.get( "items" ),

		init: function(){
			this.itemSearch = new ItemSearch();
			this.listenTo(this.itemSearch.collection, "sync", function(A,B,C){

			})
		},

		loadData: function(){
			this.render();
		},

		events:{
			"keydown .search": "search",
			"click .search-group .btn": "search",
			"click .loadMore": "loadMore"
		},

		search: function( ev ){
			var self = this, args = {}, controls;
			if( ev.type === "keydown" && ev.which !== 13 ){
				return;
			}
			Helper.loader( "#tabContainer", this.$el );
			controls = $( ev.target ).parents( "#controls" ),
			args.fts = controls.find( ".search" ).val() + " " + controls.find( ".gender" ).val();
			this.itemSearch.collection.search( ev, args ).done(function( collection ){
				self.itemSearch.metaCollection.fetchMeta( _.pluck( collection.products, "id" ) ).done(function(){
					self.itemSearch.masonry(".item");
						App.vent.trigger( "items:updateLikes", self.itemSearch.metaCollection );
				});
			});
		},

		loadMore: function( ev ){
			var self = this;
			this.itemSearch.collection.loadMoreItems()
			.done(function(a,b,c){
				var length = self.itemSearch.collection.length,
				slice = length - 5,
				newItems = self.itemSearch.collection.slice(slice, length);
				self.itemSearch
				.addItemsMasonry( self.itemSearch.renderNewItems( new MasterBaseCollection(newItems), { hidden: true } ) );
			});
		}

	});

});