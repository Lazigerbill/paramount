// Lets make a group for routes that are public, which means accessibly to anyone
// The reason that we’re not calling the group ‘public’ is because that’s a reserved word in Coffeescript / Javascript. So we just call it exposed
var exposed = FlowRouter.group({ });

exposed.route('/login', {
 	name: 'login',
 	action: function() {
   		BlazeLayout.render('blank', {content: 'welcome'});
   	}
}),

exposed.route('/signup', {
 	name: 'signup',
 	action: function() {
   		BlazeLayout.render('signup');
   	}
});   	

import '/imports/ui/pages/login.js';
var loggedIn = FlowRouter.group({
  	triggersEnter: [function(){
  		var route;
  		if (!(Meteor.loggingIn() || Meteor.userId())) {
    		route = FlowRouter.current();
    		if (route.route.name !== 'login') {
      			Session.set('redirectAfterLogin', route.path);
    		};
    		return FlowRouter.go('login');
  		}
    	
  	}]
});



import '/imports/ui/pages/dashboard.js';
import '/imports/ui/pages/pageTwo.js';

FlowRouter.route('/', {
    action: function() {
        FlowRouter.go('/dashboard');
    }
});

loggedIn.route('/dashboard', {
	name: 'dashboard',
    action: function() {
        BlazeLayout.render("mainLayout", {content: "dashboard"});
    }
});

loggedIn.route('/pageTwo', {
	name: 'pageTwo',
    action: function() {
        BlazeLayout.render("mainLayout", {content: "pageTwo"});
    }
});