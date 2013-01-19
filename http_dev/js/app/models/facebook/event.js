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
    	owner: {},
      invite_status: {}
    },

    rsvp: function(user_id, rsvp){
      this.set("invite_status", _.extend(this.get("invite_status"), {rsvp_status: rsvp}), {silent: true});
      
      fb.api('/' + this.id + '/' + rsvp, 'post', {}, _.bind(function(response){
        if(response.error){
          alert("Error: " + response.error.message);
          this.invited(user_id);
        } else {
          this.trigger("change:invite_status");
        }
      }, this));
    },

    invited: function(user_id){
    	fb.api('/' + this.id + '/invited/' + user_id, _.bind(function(response){
        this.set("invited", response.data.length, {silent: true});
    		this.set("invite_status", response.data[0]);
    	}, this));
    },
	
  	fetch: function(id){
  		id = id || this.id;
  		fb.api('/' + id, _.bind(function(response){
  			this.set(response);
  		}, this));
  	}
    });

  //return new model({id: "584099211616666"});
  return new model({id: "396263547130009"});
});
