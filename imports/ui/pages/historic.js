import './historic.html';
import 'bootstrap-datepicker/dist/css/bootstrap-datepicker3.min.css';
import 'c3/c3.min.css';
import { Readings } from "/imports/api/readings.js"
import { ReactiveVar } from 'meteor/reactive-var'
var moment = require('moment');
var datepicker = require('bootstrap-datepicker');
import c3 from 'c3';

Template.historic.onCreated(function(){
    this.reactiveDate = new ReactiveVar(moment());   
    console.log(Template.instance().reactiveDate.get());
    this.subscribe('latestReadings', {
        onReady: function(){
            Meteor.call('getDaily', moment().format("DDMMYYYY"), function(error, result){
                if(error){
                  console.log(error.reason);
                  return;
                }
            drawChart(JSON.parse(result));
            });
        }
    });
});

Template.historic.onRendered(function(){
    $('#data_1').datepicker({
        todayBtn: 'linked',
        todayHighlight: true,
        endDate: "0d"
    });
});

Template.historic.helpers({
    displayDate: function(){
        return moment(Template.instance().reactiveDate.get()).format("dddd, MMMM Do YYYY");
    }
});

Template.historic.events({
    'click #submit'(event) {
	    // Prevent default browser form submit
        event.preventDefault();
        const selDate = $('#data_1').datepicker('getDate')
        Template.instance().reactiveDate.set(selDate);
        Meteor.call('getDaily', moment(selDate).format("DDMMYYYY"), function(error, result){
            if(error){
              console.log(error.reason);
              return;
            }
            drawChart(JSON.parse(result));
        }); 
    },
    'click #export'(event) {
        event.preventDefault();
        $( event.target ).button( 'loading' );
        const date = $('#datePicker').data("DateTimePicker").date().format(); 
        console.log(date);
        Meteor.call('exportCsv', date, function(err, fileContent){
            var nameFile = new Date(date).toDateString() + '.csv';
            if(fileContent){
                var blob = new Blob([fileContent], {type: "text/plain;charset=utf-8"});
                saveAs(blob, nameFile);
                $( event.target ).button( 'reset' );
            }
            if (err){
                console.log(error.reason);
            }   
        })
    }
});

const drawChart = function(input){
    const chart = c3.generate({
        bindto: '#historyChart',
        data:{
            json: input,
            xFormat: '%d%m%Y %H:%M',
            keys: {
                x: 'ts',
                value: ['avg', 'tempCount']
            },
            colors:{
                avg: '#1ab394',
                tempCount: '#BABABA'
            },
            axes:{
                avg: 'y',
                tempCount: 'y2'
            },
            types: {
                avg: 'scatter',
                tempCount: 'area-step'
            }
        },
        zoom: {
            enabled: true
        },
        grid: {
            x: {
                show: true
            }
        },
        axis:{
            x: {
                type: 'timeseries',
                tick: {
                    count: 8,
                    format: '%H:%M'
                }
            },
            y: {
                padding: {top: 200, bottom: 300},
                label: 'avg',
            },
            y2: {
                show: true,
                padding: {top: 200, bottom: 100},
                label: 'tempCount',
            }
        }

    });
};