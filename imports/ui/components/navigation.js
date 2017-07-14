import './navigation.html';

Template.navigation.rendered = function(){

    // Initialize metisMenu
    $('#side-menu').metisMenu();

};

Template.navigation.helpers({
	currentuser_name: function(){
		return Meteor.user().profile.firstname + " " + Meteor.user().profile.lastname
	},
	currentuser_email: function(){
		return Meteor.user().profile.email
	}
});