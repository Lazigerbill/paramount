import './serverLog.html';
import moment from 'moment'
import { Lifecycles } from '/imports/api/lifecycles.js';



Template.serverLog.onCreated(function(){
	this.subscribe("lifecycles",{
		onStop: function(e){
			console.log(e);
		}
	})
})

Template.serverLog.helpers({
	serverItems: Lifecycles.find()
})