import awsIot from 'aws-iot-device-sdk';
import moment from 'moment';
import { Lifecycles } from '/imports/api/lifecycles.js';
import { Readings } from '/imports/api/readings.js';
import { RtData } from '/imports/api/rtData.js';

var base = process.env.PWD

// console.log(base);

var device = awsIot.device({
	"keyPath": base + Meteor.settings.aws_iot.keyPath,
  	"certPath": base + Meteor.settings.aws_iot.certPath,
    "caPath": base + Meteor.settings.aws_iot.caPath,
  	"clientId": Meteor.settings.aws_iot.clientId,
    "host": Meteor.settings.aws_iot.host,

    // The 'debug' option lets you see more information about the connection to
    // AWS IoT via console messages.  If you're having trouble connecting, try
    // setting this to 'true' for clues about what might be going wrong.
    //
    debug: true
});

device.on('connect', function() {
    console.log('connect');
    device.subscribe('$aws/events/+/+/test_wiced');
    device.subscribe('/things/test_wiced/test');
});

device.on('message', Meteor.bindEnvironment(function callback(topic, payload) {
    console.log(topic, payload.toString());
    var patt = new RegExp("events");
    var match = patt.test(topic);
    if (match){
        data = JSON.parse(payload);
        data.timestamp = new Date(data.timestamp) //convert epoch to js time object
        Lifecycles.insert(data), function(e) { 
            throw e;
        }
    } else {
        const data = JSON.parse(payload);
        const ts = new Date(data.d.timestamp*1000)
        const newSeq = data.d.sensor.temperature;
        newSeq.ts = ts;
        newSeq.battery = data.d.status.battery_lvl;
        newSeq.signal = data.d.status.wifi_signal;
        const arr = [newSeq];
        const collection = topic + ":" + moment(ts).format("DDMMYYYY");
        const marker = "readings.h" + moment(ts).format("H") + ".m" + moment(ts).format("m");
        const tempSum = marker + ".tempSum";
        const tempCount = marker + ".tempCount";
        const query = {}
        query[tempSum] = data.d.sensor.temperature.celsius;
        query[tempCount] = 1;
        console.log(marker);
        Readings.update(
        { "_id": collection },
        {
            $inc: query,
            $push: { 
                rtSeq: {
                    $each: arr,
                    $position: 0
                }
            }
        },
        {},
        function(err){
            if(err){
                console.log(err);
            }
        })



    };
}));
