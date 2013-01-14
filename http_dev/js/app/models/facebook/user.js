/*
 * <Models - Facebook - User>
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
    	username: "",
      name: "",
      first_name: "",
      middle_name: "",
      last_name: ""
    },
	
	fetch: function(){
		fb.api('/me', _.bind(function(response){
			this.set(response);
		}, this));
	}
  });

  return new model();
});
