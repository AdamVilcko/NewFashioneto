define(function(require){

	var
	$              = require("jquery"),
	Handlebars     = require( "handlebars" ),

	Like           = require("views/like/like"),
	Follow         = require("views/follow/follow");


	//Like helper

	Handlebars.registerHelper('like', function() {
		var view = this.viewContext;

		if( !view.like ){
			view.like = new Like( {
				className:"likeContainer",
				type: "heart",
				data: view.model.toJSON().likes,
				parentId: view.model.get( "id" )
			} );
		}

		_.defer( function(){
			$( "#replace" + view.like.cid ).replaceWith( view.like.render().$el );
		} );

		return  new Handlebars.SafeString('<div id="replace' + view.like.cid + '"></div>');
	});

	//Follow helper

	Handlebars.registerHelper('follow', function() {
		var view = this.viewContext;

		if( !view.follow ){
			view.follow = new Follow({
				isFollowed: view.model.get( "isFollowed" ),
				id: view.model.get( "id" )
			});
		}

		_.defer( function(){
			$( "#replace" + view.follow.cid ).replaceWith( view.follow.render().$el );
		} );

		return  new Handlebars.SafeString('<div id="replace' + view.follow.cid + '"></div>');
	});



});