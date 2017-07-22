import "./c3Chart.html";
import c3 from 'c3';

Template.c3Chart.rendered = function(){
    c3.generate({
        bindto: '#slineChart',
        data:{
            columns: [
                ['data1', 30, 200, 100, 400, 150, 250],
                ['data2', 130, 100, 140, 200, 150, 50]
            ],
            colors:{
                data1: '#1ab394',
                data2: '#BABABA'
            },
            type: 'spline'
        }
    });
};