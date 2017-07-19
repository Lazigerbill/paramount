import awsIot from 'aws-iot-device-sdk';
import { Lifecycles } from '/imports/api/lifecycles.js';
import { Readings } from '/imports/api/readings.js';

var base = process.env.PWD

console.log(base);

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
    // console.log(JSON.parse(payload).d);x`
    var patt = new RegExp("events");
    var res = patt.test(topic);
    if (res){
        Lifecycles.insert(JSON.parse(payload)), function(e) { 
            throw e;
        }
    } else {
        Readings.insert(JSON.parse(payload)), function(e) { 
            throw e;
        };
    }
}));
