var fs = require('fs');
var path = require('path');

var FacilityBuilder = function(){
    
    var jsonFileNames = [
                            '../../data/facilities/Wrocław_Fitness_Academy_Marino.json',
                            '../../data/facilities/Wrocław_FortGym_Braniborska.json',
                            '../../data/facilities/Wrocław_Hawana_Bałtycka.json'
                        ];
    
    var _facility = {};
  
    var _withName = function(name){
        _facility.name = name;
        return this;
    };
    
    var _withLocation = function(location){
        _facility.location = location;
        return this;
    };
    
    var _build = function(){
        return JSON.parse(JSON.stringify(_facility));
    };
    
    var _buildFromDataFiles = function(cb, shouldHaveId){
        var result = [];
        var count = jsonFileNames.length;
        jsonFileNames.forEach(function(file){
            fs.readFile(path.join(__dirname, file), 'utf8', function (err, data) {
                if (err) return cb(err);
                var parsed = JSON.parse(data.toString());
                
                if(shouldHaveId === true){
                    parsed._id = "123123123";
                }
                
                result.push(parsed);
                count--;
                if(count <= 0){
                    cb(null, result);
                }
            });
        });
    };
    
    return {
        withName: _withName,
        withLocation: _withLocation,
        build: _build,
        buildFromDataFiles: _buildFromDataFiles
    };
}();
module.exports = FacilityBuilder;