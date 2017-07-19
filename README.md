# paramount
....
## Hardware setup:
1. RTC config
  - [X]use UDP NTP to set internal WICED RTC (Reference TimeNDP.ino, change it so it works over WIFI instead of ethernet)
  - [ ]or get external RTC
2. Sensor config(Temperature sensor)
  - [ ]OneWire, 12bit resolution
3. Configure payload
  - [X]so the payload structure will match best practice for AWS-IOT
  - [ ]publish at an interval, avoid using delay(), just milli() method instead, datetime in epoch
  
1. lifecycle events:
    - [X]subscribe to events to monitor device connect/disconnect/sub/unsub status(4 possible outcomes)
2. data:
    - [ ]device status(battery level and wifi signal) (update over the same minute mark)
    - [ ]sensor data (accumlative)
    - [ ]real-time data 
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
1. 3 documents
  - [ ]device events
  - [ ]Daily sensor readings
  - [ ]RT chart data
2. setup node cron job to:
  - [X]create data placeholder
  - [ ]create functions to insert on msg

## Frontend:
1. Design layout and cards to use
2. Upon login, 
  - [ ]get RT charting data and chart
  - [ ]Grab last data point and insert to card
  - [ ]Subscript to DB and observe change, plug in to session variable and update accordingly
3. Historical data

## Deployment:
1. DB
2. App
