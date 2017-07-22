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
    	insertPlaceholder();
  	}),
  	// onComplete: Meteor.bindEnvironment(function() {
  	// 	console.log('Next day placeholder is created.')
  	// }),  	// this callback function is not working because of Meteor fiber?
   	start: true,		// start job now? or need to do job.start()
  	timeZone: 'UTC'	//timeZone
});


// The following codes insert a daily placeholder for all the readings
function insertPlaceholder(){
	const unit = {
		"tempSum": null,
		"tempCount": null,
		"tempAvg": null
	}
	let minutes = "{\"m\": {";
	for (let i = 0; i < 59; i++) {
		minutes += "\"" + i.toString() + "\": " + JSON.stringify(unit) + ",";
	}
	minutes += "\"59\": "+JSON.stringify(unit)+"}}";

	let hours = "{\"h\": {";
	for (let i = 0; i < 23; i++) {
		hours += "\"" + i.toString() + "\": "+minutes+",";
	}
	hours += "\"23\": "+minutes+"}}";

	// const d = new Date().toDateString();
	const d = moment().utc().format("DDYYYY");
	const placeholder = "{\"_id\": \"/things/test_wiced/test:" + d + "\", \"readings\": " + hours + "}";

	Readings.insert(JSON.parse(placeholder));
}
