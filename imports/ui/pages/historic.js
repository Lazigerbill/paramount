import './historic.html';
import 'bootstrap-datepicker/dist/css/bootstrap-datepicker3.min.css';
import 'c3/c3.min.css';
import { Readings } from "/imports/api/readings.js"
import { ReactiveVar } from 'meteor/reactive-var'
var moment = require('moment');
var datepicker = require('bootstrap-datepicker');
import c3 from 'c3';

Template.historic.onCreated(function(){
    this.reactiveDate = new ReactiveVar(new Date());   
    this.subscribe('summaryReadings');
    Meteor.call('getDaily', moment().format("DDMMYYYY"), function(error, result){
        if(error){
          console.log(error.reason);
          return;
        }
        drawChart(JSON.parse(result));
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
    },
    high: function(){
        const id = "/things/test_wiced/test:" + moment(Template.instance().reactiveDate.get()).format("DDMMYYYY");
        return Readings.find({'_id': id}).fetch()[0].summary.high.toFixed(4)
    },
    low: function(){
        const id = "/things/test_wiced/test:" + moment(Template.instance().reactiveDate.get()).format("DDMMYYYY");
        return Readings.find({'_id': id}).fetch()[0].summary.low.toFixed(4)
    },
    avg: function(){
        const id = "/things/test_wiced/test:" + moment(Template.instance().reactiveDate.get()).format("DDMMYYYY");
        return Readings.find({'_id': id}).fetch()[0].summary.avg.toFixed(4)
    },
    std: function(){
        const id = "/things/test_wiced/test:" + moment(Template.instance().reactiveDate.get()).format("DDMMYYYY");
        return Readings.find({'_id': id}).fetch()[0].summary.std.toFixed(4)
    },
    tsSummary: function(){
        const id = "/things/test_wiced/test:" + moment(Template.instance().reactiveDate.get()).format("DDMMYYYY");
        return Readings.find({'_id': id}).fetch()[0].summary.ts
    },
});

Template.historic.events({
    'click #submit'(event) {
        event.preventDefault();
        $( event.target ).button( 'loading' );
        const selDate = $('#data_1').datepicker('getDate')
        Template.instance().reactiveDate.set(selDate);
        Meteor.call('getDaily', moment(selDate).format("DDMMYYYY"), function(error, result){
            if(error){
              console.log(error.reason);
              $( event.target ).button( 'reset' );
              return;
            }
            drawChart(JSON.parse(result));
            $( event.target ).button( 'reset' );
        }); 
    },
    'click #export'(event) {
        event.preventDefault();
        $( event.target ).button( 'loading' );
        const date = moment(Template.instance().reactiveDate.get()).format("DDMMYYYY");
        Meteor.call('exportCsv', date, function(err, fileContent){
            var nameFile = date + '.csv';
            if(fileContent){
                console.log("fileContent");
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