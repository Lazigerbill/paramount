# paramount
Hardware setup:
1. RTC config
  - use UDP NTP to set internal WICED RTC (Reference TimeNDP.ino, change it so it works over WIFI instead of ethernet)
  - or get external RTC
2. Sensor config(Temperature sensor)
  - OneWire, 12bit resolution
3. Configure payload
  - so the payload structure will match best practice for AWS-IOT
  - publish at an interval, avoid using delay(), just milli() method instead
  
Backend:
1. setup node cron job to:
  - create data placeholder
  - create functions to insert on msg
2. create function to form RT charting document

Frontend:
1. Design layout and cards to use
2. Upon login, 
  - get RT charting data and chart
  - Grab last data point and insert to card
  - Subscript to DB and observe change, plug in to session variable and update accordingly
3. Historical data

Deployment:
1. DB
2. App
