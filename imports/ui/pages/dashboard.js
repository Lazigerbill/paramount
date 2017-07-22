import './dashboard.html';
import '/imports/ui/components/dashboard/c3Chart.js';
import '/imports/ui/components/dashboard/rtCard.js';
import '/imports/ui/components/dashboard/serverLog.js';
import '/imports/ui/components/dashboard/deviceStatus.js';

// Template.dashboard.onCreated(function(){
// 	import AWS from 'aws-sdk';
// 	import AWSIoTData from 'aws-iot-device-sdk';
// 	var AWSConfiguration = require('./aws-configuration.js');
// 	console.log('Loaded AWS SDK for JavaScript and AWS IoT SDK for Node.js');

// 	//
// 	// Remember whether or not we have subscribed to AWS IoT lifecycle events.
// 	//
// 	var subscribedToLifeCycleEvents = false;

// 	//
// 	// Remember the clients we learn about in here.
// 	//
// 	var clients = {};

// 	//
// 	// Create a client id to use when connecting to AWS IoT.
// 	//
// 	var clientId = Meteor.user()._id;

// 	//
// 	// Initialize our configuration.
// 	//
// 	AWS.config.region = AWSConfiguration.region;

// 	AWS.config.credentials = new AWS.CognitoIdentityCredentials({
// 	   IdentityPoolId: AWSConfiguration.poolId
// 	});

// 	//
// 	// Create the AWS IoT device object.  Note that the credentials must be 
// 	// initialized with empty strings; when we successfully authenticate to
// 	// the Cognito Identity Pool, the credentials will be dynamically updated.
// 	//
// 	const mqttClient = AWSIoTData.device({
// 	   //
// 	   // Set the AWS region we will operate in.
// 	   //
// 	   region: AWS.config.region,
// 	   //
// 	   // Set the AWS IoT Host Endpoint
// 	   // //
// 	   host:AWSConfiguration.host,
// 	   //
// 	   // Use the clientId created earlier.
// 	   //
// 	   clientId: clientId,
// 	   //
// 	   // Connect via secure WebSocket
// 	   //
// 	   protocol: 'wss',
// 	   //
// 	   // Set the maximum reconnect time to 8 seconds; this is a browser application
// 	   // so we don't want to leave the user waiting too long for reconnection after
// 	   // re-connecting to the network/re-opening their laptop/etc...
// 	   //
// 	   maximumReconnectTimeMs: 8000,
// 	   //
// 	   // Enable console debugging information (optional)
// 	   //
// 	   debug: true,
// 	   //
// 	   // IMPORTANT: the AWS access key ID, secret key, and sesion token must be 
// 	   // initialized with empty strings.
// 	   //
// 	   accessKeyId: '',
// 	   secretKey: '',
// 	   sessionToken: ''
// 	});

// 	// Attempt to authenticate to the Cognito Identity Pool.  Note that this
// 	// example only supports use of a pool which allows unauthenticated 
// 	// identities.
// 	//
// 	var cognitoIdentity = new AWS.CognitoIdentity();
// 	AWS.config.credentials.get(function(err, data) {
// 	   if (!err) {
// 	      console.log('retrieved identity: ' + AWS.config.credentials.identityId);
// 	      var params = {
// 	         IdentityId: AWS.config.credentials.identityId
// 	      };
// 	      cognitoIdentity.getCredentialsForIdentity(params, function(err, data) {
// 	         if (!err) {
// 	            //
// 	            // Update our latest AWS credentials; the MQTT client will use these
// 	            // during its next reconnect attempt.
// 	            //
// 	            mqttClient.updateWebSocketCredentials(data.Credentials.AccessKeyId,
// 	               data.Credentials.SecretKey,
// 	               data.Credentials.SessionToken);
// 	         } else {
// 	            console.log('error retrieving credentials: ' + err);
// 	            alert('error retrieving credentials: ' + err);
// 	         }
// 	      });
// 	   } else {
// 	      console.log('error retrieving identity:' + err);
// 	      alert('error retrieving identity: ' + err);
// 	   }
// 	});


// });