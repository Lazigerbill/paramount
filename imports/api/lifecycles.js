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