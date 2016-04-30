var db = require('./db')

db.connect('UAT', function(err){
  if(err) console.error(err);
    
  var Facility = db.facility();
  
    //read jsons
  console.log('attempting to read: ' + __dirname + '/data/facilities/')
  
  var fs = require('fs');
  var path = require('path')
  
  fs.readdir(path.join(__dirname, '/data/facilities'), function(err, files) {
  	if (err) {
  	  console.error(err)
  	  return;
  	}
  	
  	var count = files.length;
  	console.log('reading files: ' + count);
  	
  	var cb = function(err, facility){
      if(err)console.error(err)
      else console.log(facility.name + ' saved!')
      
      count--;
      if (count <= 0) {
        db.close();
      }
    }
  	
  	files.forEach(function(file) {
  		console.log('Reading file: ' + file);
  		fs.readFile(path.join(__dirname, '/data/facilities', file), 'utf8', function (err, data) {
        if (err) {
          console.error(err);
          return;
        }
        var obj = JSON.parse(data.toString());
        console.log(obj.name + ' parsed!');
        var newFacility = new Facility(obj);
        console.log(newFacility.name + ' created!');
        newFacility.save(cb);
        console.log(file + ' saved to mongo!');
      });
  	});
  });
});