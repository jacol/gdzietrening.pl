var db = require('./db')
db.connect('UAT', function(err){
    if(err) console.error(err);
    
    var Facility = db.facility();
    
    Facility.remove(function(err){
        if(err)console.error(err);
        else console.log('facilities removed!');
        
        db.close();
    });
});

