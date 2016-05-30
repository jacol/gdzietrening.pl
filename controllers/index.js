var express = require('express')
  , router = express.Router()
  , weekDay = require('../lib/weekDay')
  , moment = require('moment');

router.use('/facilities', require('./facilities'));
router.use('/schedule', require('./schedule'));
router.use('/grafik', require('./grafik'));
router.use('/contact', require('./contact'));

router.get('/', function(req, res) {
  var city, day, dayp1, limit, hour;
  
  city = 'wroclaw';
  
  day = weekDay.getDayOfWeek(new Date());
  
  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  dayp1 = weekDay.getDayOfWeek(tomorrow);
  
  hour = moment().hour() + 2;
  
  if(hour > 16) hour = 16;
  if(hour < 5) hour = 5;
  
  limit = 6;
  
  res.render('index',
  {
    wrocNowLink: '/grafik/wroclaw/' + day + '/' + hour + '/' + limit,
    wrocTomorrowMorningLink: '/grafik/wroclaw/' + dayp1 + '/' + 5 + '/' + limit,
    wrocTomorrowAfternoonLink: '/grafik/wroclaw/' + dayp1 + '/' + 14 + '/' + limit
  });

});

module.exports = router;