// Run this when the meteor app is started
// Meteor.startup(function () {

// 	console.log('client fired');
// 	import AWS from 'aws-sdk';
// 	import AWSIoTData from 'aws-iot-device-sdk';
// 	// var AWSConfiguration = require('./aws-configuration.js');

// 	console.log('Loaded AWS SDK for JavaScript and AWS IoT SDK for Node.js');
// });

import './router.js';
import './mqtt.js';



// plugins
import '/imports/ui/plugins/metisMenu/jquery.metisMenu.js';
import '/imports/ui/plugins/pace/pace.min.js';
import '/imports/ui/plugins/slimscroll/jquery.slimscroll.min.js';
// import toastr from 'toastr';