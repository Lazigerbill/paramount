import './historic.html';
import 'bootstrap-datepicker/dist/css/bootstrap-datepicker3.min.css';
import 'c3/c3.min.css';
import { Readings } from "/imports/api/readings.js"

var moment = require('moment');
var datepicker = require('bootstrap-datepicker');
import c3 from 'c3';

Template.historic.onRendered(function(){
    this.subscribe('todayReadings')
    $('#data_1').datepicker({
    	todayBtn: 'linked',
    	todayHighlight: true,
    	endDate: "0d"
    });
    c3.generate({
        bindto: '#historyChart',
        data:{
            columns: [
                ['data1', 30, 200, 100, 400, 150, 250],
                ['data2', 50, 20, 10, 40, 15, 25]
            ],
            colors:{
                data1: '#1ab394',
                data2: '#BABABA'
            }
        }
    });

});

Template.historic.events({
    'click #submit'(event) {
	    // Prevent default browser form submit
        event.preventDefault();
        const selDate = $('#data_1').datepicker('getDate')
        console.log(moment(selDate).format("DDMMYYYY"));
        Meteor.call('getDaily', moment(selDate).format("DDMMYYYY"), function(error, result){
            if(error){
              console.log(error.reason);
              return;
            }
        console.log(result);
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