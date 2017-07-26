import cron from 'cron';
import moment from 'moment';
import { Readings } from '/imports/api/readings.js';




// Seconds: 0-59
// Minutes: 0-59
// Hours: 0-23
// Day of Month: 1-31
//Months: 0-11
// Day of Week: 0-6

const creatPlaceholder = new cron.CronJob({
	cronTime: '0 0 23 * * *',
  	onTick: Meteor.bindEnvironment(function() {
    	insertPlaceholder(moment().add(1, 'd').format("DDMMYYYY"));
  	}),
  	onComplete: Meteor.bindEnvironment(function() {
  		console.log('Next day placeholder is created.')
  	}),  	// this callback function is not working because of Meteor fiber?
   	start: true,		// start job now? or need to do job.start()
  	timeZone: 'America/Toronto'	//timeZone
});
// insertPlaceholder(moment().format("DDMMYYYY"));

// The following codes insert a daily placeholder for all the readings
function insertPlaceholder(DDMMYYYY){
	const unit = {
		// "tempSum": null,
		// "tempCount": null,
		// "tempAvg": null
	}
	let minutes = "{";
	for (let i = 0; i < 59; i++) {
		minutes += "\"m" + i.toString() + "\": " + JSON.stringify(unit) + ",";
	}
	minutes += "\"m59\": "+JSON.stringify(unit)+"}";

	let hours = "{";
	for (let i = 0; i < 23; i++) {
		hours += "\"h" + i.toString() + "\": "+ minutes +",";
	}
	hours += "\"h23\": "+minutes+"}";

	// const d = new Date().toDateString();
	const id = "/things/test_wiced/test:" + DDMMYYYY;
	// const placeholder = "{\"_id\": \"/things/test_wiced/test:" + d + "\", \"readings\": " + hours + "}";

	Readings.update(
		{"_id": id},
		{$setOnInsert: 
			{"readings": JSON.parse(hours)}
		}, 
		{upsert: true}
		);
}
