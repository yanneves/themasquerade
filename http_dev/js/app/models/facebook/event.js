/*
 * <Models - Facebook - Event>
 * Author: 
 */

define([
  'underscore',
  'backbone',
  'fb'
], function(_, Backbone, fb) {
  var model = Backbone.Model.extend({
    idAttribute: "id",
    defaults: {
    	name: "",
    	description: "",
    	location: "",
    	privacy: "",
    	start_time: "",
    	timezone: "",
    	updated_time: "",
    	is_date_only: false,
    	venue: {},
    	owner: {}
    },

    invited: function(user_id){
    	fb.api('/' + this.id + '/invited/' + user_id, _.bind(function(response){
    		this.set("invited", response.data.length);
    		this.set("invite_status", response.data);
    	}, this));
    },
	
	fetch: function(id){
		id = id || this.id;
		fb.api('/' + id, _.bind(function(response){
			this.set(response);
		}, this));
	}
  });

  return new model({id: "584099211616666"});
});
