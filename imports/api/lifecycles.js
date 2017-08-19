// There is a glitch in lifecycle.
// In the case of 'client takeover', connection take place before disconnection.  
// so it may appear to be offline if only looking in chronological order.

// The following codes should be replaced by using 'shadow updates'

import { Mongo } from 'meteor/mongo';
 
export const Lifecycles = new Mongo.Collection('lifecycles');

if (Meteor.isServer){
	Meteor.publish('lifecycles', function(){
		return Lifecycles.find({}, {
			sort: {timestamp:-1}, 
			limit: 10
		});
	});
}