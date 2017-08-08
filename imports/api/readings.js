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

	Meteor.publish('summaryReadings', function(){
		return Readings.find({}, {
			fields: {summary:1}
		});
	});

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
	initializing = false;
}

if (Meteor.isServer){
    Meteor.methods({
        getDaily: function(date){
            try{
                const id = "/things/test_wiced/test:" + date
                const query = Readings.find({_id: id}, {fields: {readings:1}}).fetch()[0].readings
                let doc = [];	
                for (let h in query) {
                    if (query.hasOwnProperty(h)) {
                        for (let m in query[h]) {
                            if (query[h][m].tempSum) {
                                const momentStr = date + " " + ('0' + h.replace(/^\D+/g, "")).slice(-2) + ":" + ('0' + m.replace(/^\D+/g, "")).slice(-2);
                                query[h][m].ts = momentStr;
                                query[h][m].avg = query[h][m].tempSum/query[h][m].tempCount;
                                doc.push(query[h][m]);
                            }
                        }
                    }
                }
                return JSON.stringify(doc);
            }catch(error){
                throw new Meteor.Error("getDailyFailure", error.message);
            }
        },
        exportCsv: function(date) {
        	const id = "/things/test_wiced/test:" + date
        	const query = Readings.find({_id: id}, {fields: {readings:1}}).fetch()[0].readings
        	let doc = [];	
        	for (let h in query) {
        	    if (query.hasOwnProperty(h)) {
        	        for (let m in query[h]) {
        	            if (query[h][m].tempSum) {
        	                const momentStr = date + " " + ('0' + h.replace(/^\D+/g, "")).slice(-2) + ":" + ('0' + m.replace(/^\D+/g, "")).slice(-2);
        	                query[h][m].ts = momentStr;
        	                query[h][m].avg = query[h][m].tempSum/query[h][m].tempCount;
        	                doc.push(query[h][m]);
        	            }
        	        }
        	    }
        	}
        	var heading = true; // Optional, defaults to true
        	var delimiter = ";" // Optional, defaults to ",";
        	return exportcsv.exportToCSV(doc, heading, delimiter);
        }
    })
}