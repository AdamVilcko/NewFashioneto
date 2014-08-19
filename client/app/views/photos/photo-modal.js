define(function(require){

	var

	Handlebars = require("handlebars"),
	$          = require("jquery"),
	Helper     = require('helper'),

	ModalView  = require('components/modal'),
	Comments   = require("views/comments/comments"),
	template   = require("text!templates/photos/photos-modal.hbr"),
	Bootstrap  = require('bootstrap');





	return ModalView.extend({

		contextId: "image",
		id: "photoModal",
		className: "modal fade viewingPhoto",
		template: Handlebars.compile( template ),

		modalInit: function(){
			var self = this, selectedModelId;
			self.options.collection.fetch();
			selectedModelId = self.options.model.get("id");
			self.model = self.options.collection.get( selectedModelId );
			self.initComponents();
			self.setEvents();
		},

		initComponents: function(){
			this.render();
			if( this.model.has("commentsWrapper") ){
				this.comments = new Comments( {
					data: this.model.get("commentsWrapper").collection,
					parentId: this.model.get( "id" ),
					parentType: "IMAGE"
				} );
				this.$( ".comments" )
				.append( this.comments.render().el );
			}
			this.open();
		},

		events:{
			"click .paddle.left": function(){
				this.nextPhoto();
			},
			"click .paddle.right": function(){
				this.prevPhoto();
			}
		},

		setEvents: function(){
			var self = this;
			$("body").on("keydown", function(e){
				if(e.keyCode == 37) {
					self.nextPhoto();
				}
				else if(e.keyCode == 39) {
					self.prevPhoto();
				}
			});
		},

		nextPhoto: function(){
			this.model = this.options.collection.prev( this.model );
			this.bindData();
		},

		prevPhoto: function(){
			this.model = this.options.collection.next( this.model );
			this.bindData();
		},

		bindData: function(){
			this.comments.bindData( this.model );
			this.likes.bindData( this.model );
			this.$('#galleryImage')
			.attr("src", App.api.get("image")  + "STANDARD/" + this.model.get("id") );
		},

		onModalClose: function(){
			$("body").off("keydown");
		}

	});

});

