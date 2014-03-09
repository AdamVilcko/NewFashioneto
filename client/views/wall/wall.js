define(function(require){

	var
	Backbone   = require("backbone"),
	Handlebars = require("handlebars"),
	$          = require("jquery"),
	
	template   = require("text!templates/wall/wall.hbr"),
	Posts      = require("views/wall/posts.js");


	return Backbone.View.extend({	

		template: Handlebars.compile( template ),

		initialize: function(){
			this.posts = new Posts();			
		},

		cacheNodes: function(){
			this.nodes = {};
			this.nodes.posts = this.$el.find( "#postDisplay" );
		},

		render: function(){
			this.$el.html( this.template() );
			this.cacheNodes();
			this.nodes.posts.html( this.posts.render().el );
			return this;
		}
		
	});

});