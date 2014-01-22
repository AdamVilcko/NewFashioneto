define(function(require){

	var Backbone = require("backbone");
	var _        = require("_");	

	var router = Backbone.Router.extend({
		routes:{			
			'': 'index',
			'show/:id': 'show',
			'appointment/:id': 'showAppointment'
		},

		initialize: function(){
			this.bind( "all", this.changeRoute );
		},

		index:function(){
			console.log("Hello from the router!");

		},

		changeRoute: function(){
			console.log("Always fired");
		},

		show: function(id){
			console.log("Show " + id);
		},

		showAppointment: function(appointmentId){
			App.vent.trigger('appointment:show', appointmentId);
		}
	});	

	return router;

});