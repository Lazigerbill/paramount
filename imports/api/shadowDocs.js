// To find out whether the device is connected or not, using shadow update seems to be the most accurate
// On device connect, device will publish to "$aws/things/test_wiced/shadow/update" with the following payload:
// {"state": 
// 		{"reported":
// 				{"connected":"true"}
// 		}
// 	}
// In the case where the device is disconnected abruptly, a LWT will be sent out by the broker similar to above payload,
// instead, it will be {"connected": "false"};
// In our project, there is no need to disconnect gracefully, device ideally should be connected 24/7



import { Mongo } from 'meteor/mongo';
 
export const ShadowDocs = new Mongo.Collection('shadowDocs');

if (Meteor.isServer){
	Meteor.publish('shadowDocs', function(){
		return ShadowDocs.find({}, {
			sort: {timestamp:-1}, 
			limit: 10
		});
	});
}

