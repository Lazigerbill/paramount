# paramount trial
 
## Backend:
### Background
Currently, we have all backend code in one place.  Ideally, you want to split this into 2 parts, webserver and the background task handling MQTT.  So when deployed, a worker will be dedicated to handling MQTT tasks.

1. Webserver
2. Background
  1. setup node cron job to:
    - [X] create data placeholder
    - [X] create functions to insert on msg
    - [ ] unwind and update summary every x minute(depends on need and performance).  Use meteor aggregation.  Alternatively, when counter = 1, calculate avg of last minute mark
1. Database
  - [X] device life events.  Subscribe to events to monitor device connect/disconnect/sub/unsub status(4 possible outcomes)
  - [X] Daily sensor readings(with rtSeq"array" and summary), 3 parts:
    - sensor readings(in hours and minutes, accumlated)
    - Observe sensor reading change. Call method with path.  Method to update minute avg. 
    - [ ] summary. run by Cron every 1 minute?
    - [ ] rtSeq. rtSeq is really just for the rtChart, should deprecrate in the long run. rtChart should only observes rtSeq.  Fix length to 120.


## Frontend:
### Background
Currently, frontend is not connected to AWS Iot.  It is prefered because it will take some load off the backend, also makes it less dependent on DDP loading of DB.  In the long run, front end should be able to connect to AWS Iot directly through websocket.
The frontend framework is currently Blaze. It is ok for now, but I prefer React for furture developement.

1. [X]Design layout and cards to use
2. Upon login, 
  - [ ]get RT charting data and chart.  RT data is created ready server side, fixed length.
  - [X]Don't subscribe AWS on client side, too much trouble with authentication.  Just listen to DB change to update chart.
  - [ ]Subscript to DB and observe change, plug in to session variable(ideally, use reactive-dict instead) and update device status accordingly
3. [x] Historical data
  - since Mongo aggregation is not reactive, it is only useful for historical data.  Use function like $unwind, $project or $map to create daily charting data
  - [x] Calendar date picker.  Subcription to DB with arg listening to reactive var.  When date is selected, reactive var set new picked date.  Server side to publish the relavent date, do the following aggregation:
  a. unwind
  b. average per minute
  c. project
  - default is today's date? Use session default?
4. RT chart
  - [x] Each tick is saved as an array, new point array.unshift to the front position
  - [x] On render, chart picks up the entire array(or can array.slice into any length)
  - [ ] Oberserve sessions, sessions will also store the last tick.  Need to review this!
5. Sessions
  - [x]Sessions will always store the last tick, reading from rtSeq
  - [x]Sessions default is set to the last rtSeq
  - [x]Rt chart will get from sessions for new data
  - [x]device status/RT temp will get from sessions for latest data
  - [x]avg, hi, lo, std

Chart considerations:
1. Support JSON data
2. Support timeseries charting
3. Support dynamic data(real time)
4. Zoom
## conclusion: C3, next: ChartJS, RichShaw

## Deployment:
Future enhancement
1. Move MQTT stuff to NPM background jobs and run it on a seperate worker dyno
2. Shoud web client connect to MQTT broker? 

## Non-critical issues:
1. Server logs in dashboard is not sorted when data changes, reactive sort?
2. Change Sessions var to Reactive Dict for RT card.  Forget it, Blaze should be replaced by React anyway.
3. MQTT pub/sub
  - device: remove sub
            auto restart wiced when broker disconnects
            add keepalive function
            get watch dog timer to prevent device hang: http://docs.leaflabs.com/static.leaflabs.com/pub/leaflabs/maple-docs/0.0.12/libmaple/api/iwdg.html
  - node: sub with QoS 1
4. Revisit summary calculations, use full data instead of rtSeq
5. Move codes to woker to improve performance

## alerts
1. can test AWS SNS for admin warnings
 - seems straigth forward, define rules and messages will be published
 - May be complicated if rules are changing, so only good for certain set rules, eg. Device life cycle, battery level etc.


## Bugs report

