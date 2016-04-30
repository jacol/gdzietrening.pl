var db = require('../../db');
var initialized = false;

var MongoPopulate = function(){
  
    var _init = function(cb){
        if(initialized){
            cb();
        }
        else{
            db.connect('DEV', function(err){
               if(err)throw err;
               initialized = true;
               cb();
            });
        }
    };
    
    var _populate = function(facilities, cb){
        if(facilities == null || facilities.length == 0) cb();
        
        var count = facilities.length;
        _init(function(){
           facilities.forEach(function(newFacility){
                var Facility = db.facility();
                new Facility(newFacility).save(function(err, newDoc){
                   if(err) throw err;
                   count--;
                   if(count <= 0){
                        cb();
                   }
                });
            }); 
        });
    };
    
    var _facility = function(){
      return db.facility();
    };
    
    return {
        populate: _populate,
        facility: _facility
    };
}();
module.exports = MongoPopulate;