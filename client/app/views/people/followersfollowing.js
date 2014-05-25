define(function(require){

	var

	_              = require("_"),

	Collection     = require("collections/people/people"),
	Person         = require("views/people/person"),
	MasterBaseView = require("views/masterbaseview");


	return MasterBaseView.extend({

		modelView: Person,

		init: function(){
			this.collection = new Collection();
			App.vent.on( "profile:dataLoaded", this.update, this );
		},

		update: function( data ){
			this.collection.add( data.get( "followersWrapper" ) );
		}

	});

});