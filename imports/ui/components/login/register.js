import './register.html';

Template.register.events({
	'submit form': function(event){
		event.preventDefault();
		var firstname = $('[name=firstname]').val();
		var lastname = $('[name=lastname]').val();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
        Accounts.createUser({
    	    profile: {
	           firstname: firstname,
	           lastname: lastname,
               email: email
	        },  
            email: email,
            password: password
        }, function(error){	
    	    if(error){
    		    toastr.error(error.reason, "Account registration error");
    	    } else {
    		    FlowRouter.go('dashboard');
                toastr.success("Log in sucessful!", "New account created.")
    	}
    });
	}
})