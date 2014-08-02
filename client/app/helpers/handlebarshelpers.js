define(function(require){

	var
	$          = require("jquery"),
	Handlebars = require( "handlebars" ),
	_          = require("_"),

	Like       = require("views/like/like"),
	Follow     = require("views/follow/follow");


	//Like helper

	Handlebars.registerHelper( 'like', function( type ) {
		var view = this.viewContext, data, contextId;

		if( view.model.get( "likes" ) ){
			data = view.model.get( "likes" );
		} else {
			data = { id: view.model.get( "id" ), value: null };
		}

		type = type || "heart";

		contextId = view.contextId || "";

		if( !view.like ){
			view.like = new Like( {
				className:"likeContainer",
				type: type,
				data: data,
				parentId: view.model.get( "id" ),
				contextId: view.contextId
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

	Handlebars.registerHelper( 'image', function( id, type ) {
		return new Handlebars.SafeString( App.api.get("image" ) + type + "/" + id  );
	});

	Handlebars.registerHelper( 'imageSS', function( imageObject, size, imageAttributes ) {
		var selectedImage;
		_.each( imageObject, function( imageObj, index, list ){
			if( imageObj.sizeName === size ){
				selectedImage = imageObj;
			}
		} );
		console.log(imageObject);
		return selectedImage.url;
	});

	Handlebars.registerHelper( 'html', function( string ) {
		return new Handlebars.SafeString( string  );
	});

	Handlebars.registerHelper( 'profilePhotos', function( string ) {
		var string      = "",
		imageCollection = this.options.data.get('imagesWrapper.collection'),
		breakout = imageCollection.length > 3 ? 3 : imageCollection.length;

		for(var i = 0; i < 3; i++){
			var url;
			if( i <  breakout ){
				url = App.api.get("image" ) + "WALL" + "/" + imageCollection.at(i).id;
			} else {
				url = "img/avatar.jpg";
			}
			string += '<div class="col-xs-4"><a href="#" class="img-thumbnail"><img src="' + url + '" alt="..."></a></div>';
		}

		return new Handlebars.SafeString( string  );
	});

});