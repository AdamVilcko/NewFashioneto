define(function(require){

	var

	Handlebars = require("handlebars"),
	$          = require("jquery"),
	Helper     = require('helper'),

	ModalView  = require('components/modal'),
	Comments   = require("views/comments/comments"),
	template   = require("text!templates/photos/photos-modal.hbr"),
	Bootstrap  = require('bootstrap'),

	photoModalMockData   = require('text!mockdata/photomodal.json');




	return ModalView.extend({

		contextId: "photo",
		id: "photoModal",
		className: "modal fade viewingPhoto",
		template: Handlebars.compile( template ),

		modalInit: function(){
			var self = this;
			this.options.model.collection.fetchDetails( this.options.model ).done(function(){

			});
			self.initComponents();
		},

		initComponents: function(){
			this.model.set( JSON.parse( photoModalMockData ) );
			this.render();
			if( this.model.has( "commentsWrapper" ) ){
				var commentData = this.model.get("commentsWrapper").collection;
				this.comments = new Comments( { data: commentData, parentId: this.model.get( "id" ) } );
				this.$( ".comments" )
				.append( this.comments.render().el );
			}
			this.open();
		}


	});

});

