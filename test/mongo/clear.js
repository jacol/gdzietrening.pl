var db = require('../../db');

var MongoClear = function(){
  
    var _clear = function(cb){
        var Facility = db.facility();
        Facility.remove(function(err){
            if(err){
                cb(err);
                return;
            }
            db.close();
            cb();
        });
    };
    
    return {
        clear: _clear
    };
}();
module.exports = MongoClear;