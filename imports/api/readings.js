import { Mongo } from 'meteor/mongo';
import { mean } from 'simple-statistics';
import { min } from 'simple-statistics';
import { max } from 'simple-statistics';
import { standardDeviation } from 'simple-statistics';

var moment = require('moment');

export const Readings = new Mongo.Collection('readings');

if (Meteor.isServer){
	Meteor.publish('todayReadings', function(){
		const id = "/things/test_wiced/test:" + moment().format("DDMMYYYY")
		return Readings.find({_id: id});
	});

	Meteor.publish('latestReadings', function(){
		const id = "/things/test_wiced/test:" + moment().format("DDMMYYYY")
		return Readings.find({_id: id}, {
			fields: {rtSeq:1}
		});
	});
}

// The following codes update the summary every 12 ticks(1 min)
const query = Readings.find();
let initializing = true;
let counter = 0
query.observeChanges({
    changed: function(id, doc) {
        if (!initializing) {
        	counter += 1;
        	if (counter >= 12){
        		let arr = doc.rtSeq.map(function(x){
        			return x.celsius
        		});
        		const avg = mean(arr);
        		const low = min(arr);
        		const high = max(arr);
        		const std = standardDeviation(arr);
        		Readings.update({'_id': id}, 
        			{$set: {
	        			'summary.avg': avg,
	        			'summary.low': low,
	        			'summary.high': high,
	        			'summary.std': std,
	        			'summary.ts': new Date()
	        		}
        		})
        		counter = 0;
        	}
        }
	}
});
// initializing = false;
// if (Meteor.isServer){
// 	// Perform this in client, after subscription onReady, do the array prep and then draw chart
// 	// Need to input date here: DDMMYYYY, will be used for query
// 	const date = "27072017";
// 	const id = "/things/test_wiced/test:" + date
// 	const query = Readings.find({_id: id}, {fields: {readings:1}}).fetch()[0].readings
// 	let doc = [];
// 	for (let h in query) {
// 		if (query.hasOwnProperty(h)) {
// 			for (let m in query[h]) {
// 				if (query[h][m].tempSum) {
// 					// query[h][m].min = m.replace(/^\D+/g, "");
// 					// query[h][m].hr = h.replace(/^\D+/g, "");
// 					const momentStr = date + " " + h.replace(/^\D+/g, "") + ":" + m.replace(/^\D+/g, "");
// 					query[h][m].ts = moment(momentStr, 'DDMMYYYY H:m')
// 					query[h][m].avg = query[h][m].tempSum/query[h][m].tempCount;
// 					doc.push(query[h][m]);
// 				}
// 			}
// 		}
// 	}
// 	// unrole mins
// 	// console.log(doc)
// }