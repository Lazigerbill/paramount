import "./rtCard.html";
import { Readings } from '/imports/api/readings.js';

Template.rtCard.onCreated(function(){
	this.subscribe("todayReadings",{
		onStop: function(e){
			console.log(e);
		}
	})
})
if (Meteor.isClient){
	Template.rtCard.helpers({
		celsius() {
			return Session.get('celsius');
		},
		fahrenheit(){
			return Session.get('fahrenheit');
		},
		ts(){
			return Session.get('ts');
		},
		avg(){
			return Readings.findOne().summary.avg.toFixed(4);
		},
		high(){
			return Readings.findOne().summary.high.toFixed(4);
		},
		low(){
			return Readings.findOne().summary.low.toFixed(4);
		},
		std(){
			return Readings.findOne().summary.std.toFixed(4);
		}, 
		tsSummary(){
			return Readings.findOne().summary.ts;
		}
	});
}