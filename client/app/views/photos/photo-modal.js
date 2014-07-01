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
			/*this.options.model.collection.fetchDetails( this.options.model ).done(function(){

			});*/

			this.options.model.collection.add( JSON.parse( photoModalMockData ) );
			self.initComponents();
		},

		initComponents: function(){
			this.render();
			this.comments = new Comments( {
				data: this.model.get("commentsWrapper").collection,
				parentId: this.model.get( "id" )
			} );
			this.$( ".comments" )
			.append( this.comments.render().el );
			this.open();
		},

		loadData: function(){

		},

		events:{
			"click .paddle.left": function(){
				this.model = this.next( this.model );
			},
			"click .paddle.right": function(){
				this.model = this.prev( this.model );
			}
		}


	});

});

