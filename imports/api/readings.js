import { Mongo } from 'meteor/mongo';
var moment = require('moment');

export const Readings = new Mongo.Collection('readings');

