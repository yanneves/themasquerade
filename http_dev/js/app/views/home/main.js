/*
 * <Views - Home - Main>
 * Author: 
 */
 
define([
	'jquery',		// jQuery Library
	'underscore',	// UnderscoreJS Library
	'backbone',		// BackboneJS MVC
	'app/models/facebook/user',
	'app/models/facebook/event',
	'text!templates/home/main.html.tpl'
], function($, _, Backbone, fb_user, fb_event, tpl){
	
	var view = Backbone.View.extend({
		template: _.template(tpl),

		el: "#content",

		render: function(){
			var data = {
				user: fb_user.toJSON(),
				event: fb_event.toJSON()
			}

			this.$el.html( this.template(data) );
		},

		page: function(){
			fb_event.on("change:invited", function(event){
				this.render();
			}, this);
			
			fb_user.on("change", function(user){
				// unbind
				fb_user.off("change");
				
				// check whether user is invited
				fb_event.invited(user.id);
			});

			fb_user.fetch();
			fb_event.fetch();
		}
	});
	return new view;
});