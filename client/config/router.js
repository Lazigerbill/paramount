
FlowRouter.route('/', {
    action: function() {
        FlowRouter.go('/dashboard');
    }
});

FlowRouter.route('/dashboard', {
    action: function() {
        BlazeLayout.render("mainLayout", {content: "dashboard"});
    }
});

FlowRouter.route('/pageTwo', {
    action: function() {
        BlazeLayout.render("mainLayout", {content: "pageTwo"});
    }
});