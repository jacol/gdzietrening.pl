var express = require('express')
  , router = express.Router()
  , Facilities = require('../models/facilities');


router.get('/:id', function(req, res) {
  Facilities.get(req.params.id, function (err, facility) {
    res.render('facilities/facility', {facility: facility});
  });
});

module.exports = router;