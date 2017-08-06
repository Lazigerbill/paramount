# paramount
....
## Hardware setup:
1. RTC config
  - [X]use UDP NTP to set internal WICED RTC (Reference TimeNDP.ino, change it so it works over WIFI instead of ethernet)
  - [ ]or get external RTC (NIST is not reliable...should consider getting RTC)
2. Sensor config(Temperature sensor)
  - [X]OneWire, 12bit resolution
3. Configure payload
  - [X]so the payload structure will match best practice for AWS-IOT
  - [X]publish at an interval, avoid using delay(), just milli() method instead, datetime in epoch
  
1. lifecycle events:
    - [X]subscribe to events to monitor device connect/disconnect/sub/unsub status(4 possible outcomes)
2. data:
    - [X]device status(battery level and wifi signal) (update over the same minute mark)
    - [X]sensor data (accumlative)
    - [X]real-time data 
    data: [{ts: xxx, temp: xxx}, {ts: xxx, temp: xxx},...]
    use push to keep that to a limited length
    
  {
    "d": {
        "status": {
            "battery_lvl": XX,
            "wifi_signal": XX
        }
        "sensor": {
            "temperature" :XX
        }
        "timestamp": epoch
    }
}
  
## Backend:
1. 2 documents
  - [X]device events
  - [X]Daily sensor readings(with rtSeq"array" and summary)
2. setup node cron job to:
  - [X]create data placeholder
  - [X]create functions to insert on msg

## Frontend:
1. [X]Design layout and cards to use
2. Upon login, 
  - [ ]get RT charting data and chart.  RT data is created ready server side, fixed length.
  - [X]Don't subscribe AWS on client side, too much trouble with authentication.  Just listen to DB change to update chart.
  - [X]Subscript to DB and observe change, plug in to session variable and update device status accordingly
3. Historical data
  - since Mongo aggregation is not reactive, it is only useful for historical data.  Use function like $unwind, $project or $map to create daily charting data
  - Calendar date picker.  Subcription to DB with arg listening to Session.get.  When date is selected, Session.set new picked date.  Server side to publish the relavent date, do the following aggregation:
  a. unwind
  b. average per minute
  c. project
  - default is today's date? Use session default?
4. RT chart
  - [x]Each tick is saved as an array, new point array.unshift to the front position
  - [x]On render, chart picks up the entire array(or can array.slice into any length)
  - [x]Oberserve sessions, sessions will also store the last tick

5. Sessions3.
  - [x]Sessions will always store the last tick, reading from rtSeq
  - [x]Sessions default is set to the last rtSeq
  - [x]Rt chart will get from sessions 3.for new data
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

## Bugs report
1. Battery level is not accurate
2. Server logs in dashboard is not sorted when data changes
3. Device disconnects frequently, not sure if it is the issue with Device or MQTT broker, can test with blinks onboard.
4. Change Sessions var to Reactive Dict
