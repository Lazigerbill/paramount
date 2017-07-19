import { Template } from 'meteor/templating';
 
import { Lifecycles } from '../api/lifecycles.js';
 
import './lifecycles.html';
 
Template.body.helpers({
  lifecycels() {
    return Lifecycles.find({}, { sort: { createdAt: -1 } });
  },
});