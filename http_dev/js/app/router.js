/*
 * <Router>
 * Author: 
 */
 
define([
	'jquery',		// jQuery Library
	'underscore',	// UnderscoreJS Library
	'backbone',		// BackboneJS MVC
	// Views
	'app/views/home/main'
], function($, _, Backbone, mainView){
	var AppRouter = Backbone.Router.extend({
		routes:{
			// Define some URL routes
			'': 'showHome',
			'!/': 'showHome',
			
			// Default
			'*actions': 'defaultAction'
		},
		showHome:function(){
			// root route
			this.navigate('!/');
			// render home page
			mainView.page();
		},
		defaultAction:function(actions){
			// log route
			log("Route (" + actions + ") not defined! Rerouting to home.", 'dev');
			
			// We have no matching route, let's display the home page
			this.navigate('!/404');
			this.showHome();
		}
	});
	
	var init = function(){
		var app_router = new AppRouter;
		Backbone.history.start();
	};
	return {
		initialize: init
	};
});
