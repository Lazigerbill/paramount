import "./c3Chart.html";
import { Readings } from '/imports/api/readings.js'
import c3 from 'c3';

Template.c3Chart.onCreated(function(){
    this.subscribe("latestReadings",{
        onReady: function(){
            initChart();
            // console.log(Array.isArray(Readings.findOne().rtSeq.slice(0,200)));
        },
        onStop: function(e){
            console.log(e);
        }
    })
});


const initChart = function(){
    // console.log(Readings.findOne().rtSeq)
    const chart = c3.generate({
        bindto: '#slineChart',
        data:{
            json: Readings.findOne().rtSeq.slice(0,200),
            keys: {
                x: 'ts',
                value: ['celsius', 'fahrenheit']
            },
            colors:{
                celsius: '#1ab394',
                fahrenheit: '#BABABA'
            },
            axes:{
                celsius: 'y',
                fahrenheit: 'y2'
            },
            types: {
                celsius: 'scatter',
                fahrenheit: 'area-step'
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
                label: 'celsius',
            },
            y2: {
                show: true,
                padding: {top: 200, bottom: 100},
                label: 'fahrenheit',
            }
        },
        oninit: function(){
            const query = Readings.find();
            let initializing = true;
            query.observeChanges({
                changed: function(id, doc) {
                    if (!initializing) {
                        chart.load({
                            json: Readings.findOne().rtSeq.slice(0,200),
                            keys: {
                                x: 'ts',
                                value: ['celsius', 'fahrenheit']
                            }
                        });
                     }
                }
             });  
             initializing = false; 
        }
    });
};