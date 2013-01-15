/*
 * <Core>
 * Author: 
 */

/* =Table of Contents=
-----------------------------------------------

01|	=Table of Contents=
02|	=References=
03|	=Namespace=
  |		=Modernizr=
  |		=RespondJS=
  |		=RequireJS=
  |		=(dot)Log=
04|	=Environment=
05|	=AMD=
06|	=Classes=
  |		=SAS=
  |		=APP=
07|	=Initiation=

*/

/* =References=
-----------------------------------------------

	No references.

*/

/* =Namespace=
----------------------------------------------- */

	// =Modernizr=
	// feature detection and polyfiller
	var feature = Modernizr || {};
	
	// =RespondJS=
	// polyfiller for responsive design
	var respond = respond || {};
	
	// =(dot)Log=
	// lightweight wrapper for 'log'
	// usage: log('inside coolFunc', this, arguments);
	var log = log || function(args){};
	
	// =RequireJS=
	// AMD script loader
	var AMD = require;


	
/* =Environment=
----------------------------------------------- */

	var ENV = {
		// development environment?
		development:true,
		// testing environment?
		testing:true,
		// production environment?
		production:false,
		
		// environment logging
		console: {
			log: log
		},
		log: function(msg, env){
			// set scope
			var base = ENV;
				output = true;
			
			if(env){
				// handle aliases
				switch(env){
					// shorthand
					case 'dev': { env = 'development'; break;}
					case 'test': { env = 'testing'; break;}
					case 'prod': { env = 'production'; break;}
				}
				// interpret and log for environment
				if(base[env] === true){
					base.console.log(env.toUpperCase() + ": " + msg);
				} else {
					output = false;
				}
			} else { base.console.log(msg);}
			
			return output;
		},
		
		// initiate environments
		init: function(){
			// overwrite existing 'log' functionality
			log = this.log;
			
			// log environments
			log("Development Environment active", 'development');
			log("Testing Environment active", 'testing');
			log("Production Environment active", 'production');
		}
	}; ENV.init();



/* =AMD=
----------------------------------------------- */

	AMD.config({
		paths: {
			// require plug-ins
			text:'app/libs/require/text',
			
			// polyfillers
			belatedpng:'//cdnjs.cloudflare.com/ajax/libs/dd_belatedpng/0.0.8/dd_belatedpng.min',
			
			// libraries
			jquery:'//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min',
			tb:'//twitter.github.com/bootstrap/assets/js/bootstrap',
			fb:'app/libs/facebook/api',
			fb_ext:'//connect.facebook.net/en_US/all',
			underscore:'//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.3.1-amdjs/underscore-amd-min', // Underscore AMD optimised version
			backbone:'//cdnjs.cloudflare.com/ajax/libs/backbone.js/0.9.1-amdjs/backbone-amd-min', // Backbone AMD optimised version
			backbone_localStorage:'app/libs/backbone/localstorage', // Backbone Local Storage plugin
			mobileboilerplate:'app/libs/mbp/boilerplate_mobile', // Mobile Boilerplate JavaScript helper functions
			
			// application
			boilerplate:'app/libs/boilerplate',
			index:'app/index',
			router:'app/router',
			templates:'../templates',
			libs:'app/libs'
		}
	});



/* =Classes=
----------------------------------------------- */

	// =SAS=
	// stand-alone script
	SAS = {
		domManipulation:function($, dom){
			// jQuery behaviourisms
			$(document).ready(function(){
				dom.init();
			});
		},
		mobileHelpers:function($, mbp){
			// Mobile Boilerplate helpers
			$(document).ready(function(){
				mbp.init();
			});
		},
		init:function($){
			// set scope
			var base = SAS;
			
			// log once jQuery is ready
			log("jQuery is ready!", 'dev');
			
			if(typeof respond != 'undefined'){
				// identify media query support
				log("Are media queries supported? " + ((respond.mediaQueriesSupported) ? "Yes" : "No"), 'test');
			}
			
			// check for opacity, otherwise load 'belatedpng'
			/*if(feature.opacity === false){
				AMD(['belatedpng'], function(){
					DD_belatedPNG.fix('img');
				});
			}*/
		}
	};

	// =FBAUTH=
	// Facebook Authentication
	FBAUTH = {
		callbacks: {
			existing: function(response){
				if(FBAUTH.popover.length){
					FBAUTH.popover.trigger("hidden");
				}
			},
			authorised: function(response, fb){
				if(FBAUTH.popover.length){
					FBAUTH.popover.modal("hide");
				}
			},
			not_authorized: function(fb){
				// do nothing
			}
		},
		test:function(fb){
			log('Welcome!  Fetching your information.... ', 'test');
			fb.api('/me', function(response) {
				log('Good to see you, ' + response.name + '.', 'test');
			});
		},
		login:function(fb){
			fb.login(function(response) {
				if (response.authResponse) {
					FBAUTH.callbacks.authorised(response);
				} else {
					FBAUTH.callbacks.not_authorized();
				}
			});
		},
		status: function(fb, callback){
			fb.getLoginStatus( callback );
		},
		init:function(fb){
			FBAUTH.popover = $("#fbLoginModal");
			FBAUTH.trigger = $("#fbLoginBtn", FBAUTH.popover);

			// set parameters
			fb.init({
				appId      : '189086967899527', // App ID
				channelUrl : '//themasquerade.local/channel.html', // Channel File
				status     : true, // check login status
				cookie     : true, // enable cookies to allow the server to access the session
				xfbml      : true  // parse XFBML
			});
		}
	};

	// =APP=
	// application executables
	APP = {
		init:function(app){
			// set scope
			var base = APP;
			
			// log once everything is ready
			log("Firing application!", 'dev');
			
			// initiate application
			app.initialize();
		}
	};



/* =Initiation=
----------------------------------------------- */

	AMD(['jquery', 'tb'], function($){
		SAS.init($);

		AMD(['jquery', 'fb', 'tb'], function($, fb){
			// initiate fbauth settings
			FBAUTH.init(fb);

			// request status
			FBAUTH.status(fb, function(response){
				if (response.status === 'connected') {
					// connected
					FBAUTH.callbacks.existing(response);
				} else {
					// open modal
					FBAUTH.popover.modal({
						keyboard: false,
						backdrop: 'static'
					});

					// bind to click for log on
					FBAUTH.trigger.on("click", function(e){
						// not authorised
						FBAUTH.login(fb);

						// prevent default behaviour
						e.preventDefault();
					});
				}
			});

			FBAUTH.popover.on("hidden", function(){
				// start application
				AMD(['index'], function(index){
					APP.init(index);
				});
			});
		});
	});
	
	/*AMD(['jquery', 'dom'], function($, dom){
		SAS.domManipulation($, dom);
	});*/
	
	AMD(['jquery', 'mbp'], function($, mbp){
		SAS.mobileHelpers($, mbp);
	});
