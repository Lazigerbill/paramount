import "./deviceStatus.html";
import { ShadowDocs } from '/imports/api/shadowDocs.js';

Template.deviceStatus.onCreated(function(){
	this.subscribe("shadowDocs",{
		onStop: function(e){
			console.log(e);
		}
	})
})

Template.deviceStatus.helpers({
	connect(){
		const doc = ShadowDocs.find({}, {sort: {timestamp: -1}, limit:1}).fetch();
		console.log(doc);
		return doc[0].current.state.reported.connected
	},
	battery(){
		return Session.get('battery');
	},
	signal(){
		return Session.get('signal');
	}
});
