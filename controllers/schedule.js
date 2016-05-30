var express = require('express')
  , router = express.Router()
  , facilities = require('../models/facilities')
  , weekDay = require('../lib/weekDay')
  , schedule = require('../lib/schedule')
  , paramsFactory = require('../lib/paramsFactory');

router.get('/:city/:day/:hour/:limit', function(req, res) {
  var limit = parseInt(req.params.limit);
  var day = req.params.day;
  var city = req.params.city;
  var hour = parseInt(req.params.hour);
  
  facilities.all(function (err, facilities) {
    res.setHeader('Content-Type', 'application/json');
    
    if(err)
    	res.send(JSON.stringify({ error: 'unhandled error in shcedule controller' }));
    else{
      var date = weekDay.getDateForDay(day, new Date(new Date().setHours(hour, 0, 0, 0)));
      var scheduleCollection = schedule.create(facilities, date, limit);
      
      var result = {
        scheduleCollection: scheduleCollection
      };
      
    	res.send(JSON.stringify(result));
    }
  });
});



module.exports = router;