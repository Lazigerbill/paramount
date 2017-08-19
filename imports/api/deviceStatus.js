import { Mongo } from 'meteor/mongo';
 
export const DeviceStatus = new Mongo.Collection('deviceStatus');

if (Meteor.isServer){
	Meteor.publish('deviceStatus', function(){
		const id = "/things/test_wiced/test";
		return DeviceStatus.find({_id: id}, {
			fields: {rtSeq:1}
		});
	});
}