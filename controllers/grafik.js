var express = require('express')
  , router = express.Router()
  , weekDay = require('../lib/weekDay')
  , moment = require('moment')
  , paramsFactory = require('../lib/paramsFactory');

router.get('/:city?/:day?/:hour?/:limit?', function(req, res) {
  var city, day, dayp1, limit, hour, render = false;
  
  if(req.params.city) city = req.params.city;
  else city = 'wroclaw';
  
  if(req.params.day) day = req.params.day;
  else day = weekDay.getDayOfWeek(new Date());
  
  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  dayp1 = weekDay.getDayOfWeek(tomorrow);
  
  if(req.params.hour){
    render = true;
    hour = parseInt(req.params.hour);
  } 
  else hour = moment().hour() + 2;
  
   //if(hour > 16) hour = 16;
   //if(hour < 5) hour = 5;
  
  if(req.params.limit) limit = parseInt(req.params.limit);
  else limit = 6;
  
  res.render('index',
  {
    forwardLink: '/grafik' + paramsFactory.createForwardParams(city, day, hour, limit),
    backwardLink: '/grafik' +  paramsFactory.createBackwardParams(city, day, hour, limit),
    city: city,
    day: day,
    dayp1: dayp1,
    limit: limit,
    hour: hour,
    render: render
  });
});

module.exports = router;