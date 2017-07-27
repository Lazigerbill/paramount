import './serverLog.html';
import moment from 'moment'
import { Template } from 'meteor/templating';
import { Lifecycles } from '/imports/api/lifecycles.js';



Template.serverLog.onRendered(function(){
	Meteor.subscribe("lifecycles",{
		onStop: function(e){
			console.log(e);
		}
	})
})

Template.serverLog.helpers({
	serverItems: Lifecycles.find()
})