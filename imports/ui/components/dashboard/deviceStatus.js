import "./deviceStatus.html";

Template.deviceStatus.helpers({
	battery(){
		return Session.get('battery');
	},
	signal(){
		return Session.get('signal');
	}
});
