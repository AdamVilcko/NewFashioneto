define(function(require){

	var

	MasterBaseView = require( 'views/masterbaseview' );

	return MasterBaseView.extend({

		render: function(){
			this.$el.empty();
			this.collection.each( this.renderItem, this );
			return this;
		},

		renderItem: function( item ){
			var itemView = new this.item( { model: item } );
			this.$el.append( itemView.render().el );			
		}

	});

});