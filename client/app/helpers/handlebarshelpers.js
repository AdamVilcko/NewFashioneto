define(function(require){

	var
	$              = require("jquery"),
	Handlebars     = require( "handlebars" ),

	Like           = require("views/like/like"),
	Follow         = require("views/follow/follow");


	//Like helper

	Handlebars.registerHelper( 'like', function() {
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
			view.like.renderToDom();
		} );

		return  new Handlebars.SafeString('<' + view.like.tagName +' data-view="' + view.like.cid + '"></'+ view.like.tagName +'>');
	});

	//Follow helper

	Handlebars.registerHelper( 'follow', function() {
		var view = this.viewContext;

		if( !view.follow ){
			view.follow = new Follow({
				isFollowed: view.model.get( "isFollowed" ),
				id: view.model.get( "id" )
			});
		}

		_.defer( function(){
			view.follow.renderToDom();
		} );

		return  new Handlebars.SafeString('<' + view.follow.tagName +' data-view="' + view.follow.cid + '"></'+ view.follow.tagName +'>');
	});


});