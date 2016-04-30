var express = require('express')
  , router = express.Router()
  , Facilities = require('../models/facilities')
  , weekDay = require('../lib/weekDay')
  , moment = require('moment');

router.use('/facilities', require('./facilities'));
router.use('/schedule', require('./schedule'));

router.get('/:city?/:day?/:hour?/:limit?', function(req, res) {
  var city, day, dayp1, limit, hour;
  if(req.params.city) city = req.params.city;
  else city = 'wro';
  
  if(req.params.day) day = req.params.day;
  else day = weekDay.getDayOfWeek(new Date());
  
  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  dayp1 = weekDay.getDayOfWeek(tomorrow);
  
  if(req.params.hour) hour = req.params.hour;
  else hour = moment().hour() + 2;
  
  if(hour > 16) hour = 16;
  if(hour < 5) hour = 5;
  
  if(req.params.limit) limit = req.params.limit;
  else limit = 6;
  
  Facilities.all(function(err, result) {
    if(err){
        console.error(err);
    }
    res.render('index',
    {
      facilities: result,
      city: city,
      day: day,
      dayp1: dayp1,
      limit: limit,
      hour: hour
    });
  });
});

module.exports = router;