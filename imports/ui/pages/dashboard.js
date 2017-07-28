import './dashboard.html';
import '/imports/ui/components/dashboard/c3Chart.js';
import '/imports/ui/components/dashboard/rtCard.js';
import '/imports/ui/components/dashboard/serverLog.js';
import '/imports/ui/components/dashboard/deviceStatus.js';
import { Readings } from '/imports/api/readings.js';

Template.dashboard.onCreated(function(){
	this.subscribe('latestReadings', {
		onReady: function(){
			const query = Readings.findOne().rtSeq[0];
			Session.set({
				"battery": query.battery,
				"signal": query.signal,
				"celsius": query.celsius,
				"fahrenheit": query.fahrenheit,
				"ts": query.ts
			});
		},
		onStop: function(e){
			console.log(e);
		}
	})
	const query = Readings.find();
	let initializing = true;
	query.observeChanges({
        changed: function(id, doc) {
            if (!initializing) {
            	Session.set({
            		"battery": query.fetch()[0].rtSeq[0].battery,
            		"signal": query.fetch()[0].rtSeq[0].signal,
            		"celsius": query.fetch()[0].rtSeq[0].celsius,
            		"fahrenheit": query.fetch()[0].rtSeq[0].fahrenheit,
            		"ts": query.fetch()[0].rtSeq[0].ts
            	});
            }
    	}
	});

	initializing = false;
});
