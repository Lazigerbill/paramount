// import './mqtt.js';
import awsIot from 'aws-iot-device-sdk';

var base = process.env.PWD

var device = awsIot.device({
	"keyPath": base + Meteor.settings.aws_iot.keyPath,
  	"certPath": base + Meteor.settings.aws_iot.certPath,
    "caPath": base + Meteor.settings.aws_iot.caPath,
  	"clientId": Meteor.settings.aws_iot.server,
    "host": Meteor.settings.aws_iot.host,

    // The 'debug' option lets you see more information about the connection to
    // AWS IoT via console messages.  If you're having trouble connecting, try
    // setting this to 'true' for clues about what might be going wrong.
    //
    debug: true
});

device.on('connect', function() {
    console.log('connect');
    device.subscribe('$aws/things/test_wiced/test');
    // device.publish('topic_2', JSON.stringify({ test_data: 1}));
});

device.on('message', function(topic, payload) {
    console.log('message', topic, payload.toString());
});
