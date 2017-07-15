# paramount
....
## Hardware setup:
1. RTC config
  - use UDP NTP to set internal WICED RTC (Reference TimeNDP.ino, change it so it works over WIFI instead of ethernet)
  - or get external RTC
2. Sensor config(Temperature sensor)
  - OneWire, 12bit resolution
3. Configure payload
  - so the payload structure will match best practice for AWS-IOT
  - publish at an interval, avoid using delay(), just milli() method instead, datetime in epoch
  
...a. lifecycle events:
    - subscribe to events to monitor device connect/disconnect/sub/unsub status(4 possible outcomes)
...b. data:
    - device status(battery level and wifi signal)
    - sensor data
    
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
  ...a. device events
  ...b. Daily sensor readings
  ...c. RT chart data
2. setup node cron job to:
  - create data placeholder
  - create functions to insert on msg
3. create function to form RT charting document

## Frontend:
1. Design layout and cards to use
2. Upon login, 
  - get RT charting data and chart
  - Grab last data point and insert to card
  - Subscript to DB and observe change, plug in to session variable and update accordingly
3. Historical data

## Deployment:
1. DB
2. App
