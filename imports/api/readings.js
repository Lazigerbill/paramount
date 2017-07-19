import { Mongo } from 'meteor/mongo';
var moment = require('moment');

export const Readings = new Mongo.Collection('readings');

// The following codes insert a daily placeholder for all the readings
const unit = {
	"tempSum": null,
	"tempCount": null,
	"tempAvg": null
}
let minutes = "{";
for (let i = 0; i < 59; i++) {
	minutes += "\"m"+i.toString()+"\": "+JSON.stringify(unit)+",";
}
minutes += "\"m59\": "+JSON.stringify(unit)+"}";

let hours = "{";
for (let i = 0; i < 23; i++) {
	hours += "\"h"+i.toString()+"\": "+minutes+",";
}
hours += "\"h23\": "+minutes+"}";

// d = new Date().toDateString();
const d = moment().format("MMDDYYYY");
const placeholder = "{\"_id\": \"/things/test_wiced/test:" + d + "\", \"readings\": " + hours + "}";

Readings.insert(JSON.parse(placeholder));