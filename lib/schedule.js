var weekDay = require('./weekDay');
var timeRangeParser = require('./timeRangeParser');
var moment = require('moment');
var mustache = require("mustache");
var fs = require("fs");

var Schedule = function(){
  var _create = function(facilities, startDate, howManyHours){
    if(facilities == null || facilities.length == 0)
      return [];
    else {
      var day = weekDay.getDayOfWeek(startDate);
      return _extractSchedules(facilities, day, startDate, howManyHours);
    }
  };
  
  var _extractSchedules = function(facilities, day, baseDate, howManyHours){
    var result = [];
    
    day = _convertToEngName(day);
    
    facilities.forEach(function(facility){
       result = result.concat(_extractOneDay(facility.schedule[day], facility, baseDate));
    });
    
    var begin = new Date(baseDate.getTime());
    var beginTime = begin.getTime();
    var end = new Date(baseDate.getTime());
    end.setHours(end.getHours() + howManyHours);
    var endTime = end.getTime();
    
    result = result.filter(function(item){
      return item[2].getTime() >= beginTime && item[3].getTime() <= endTime;
    });
    
    return _convertToResultFormat(result);
  };
  
  var _convertToEngName = function(day){
    switch(day){
    	case 'poniedzialek': return 'mon';
    	case 'wtorek': return 'tue';
    	case 'sroda': return 'wed';
    	case 'czwartek': return 'thu';
    	case 'piatek': return 'fri';
    	case 'sobota': return 'sat';
    	case 'niedziela': return 'sun';
    }
  };
  
  var _extractOneDay = function(scheduleArray, facility, baseDate){
    var result = [];
    scheduleArray.forEach(function(scheduleItem){
      var name = scheduleItem.name;
      var desc = scheduleItem.description;
      
      var startDate = timeRangeParser.getStartTime(scheduleItem.time, baseDate);
      var endDate = timeRangeParser.getEndTime(scheduleItem.time, baseDate);
      
      result.push([
        facility.name,
        name,
        startDate,
        endDate,
        facility._id,
        _createTooltipHtml(name, desc, facility, startDate, endDate)
      ]);
    });
    
    return result;
  };
  
  var _convertToResultFormat = function(result){
    return result.map(function(item){
      var startDate = new Date(item[2]);
      var endDate = new Date(item[3]);
      
      return [
          item[0],
          item[1],
          moment(startDate).format('YYYY-MM-DD HH:mm'),
          moment(endDate).format('YYYY-MM-DD HH:mm'),
          item[4],
          item[5]
        ];
    });
  };
  
  var _createTooltipHtml = function(itemName, desc, facility, startDate, endDate){
    var view = fs.readFileSync('./views/partials/tooltip.html').toString();
    var data = { itemName: itemName, desc: desc, facility: facility, startDate: moment(startDate).format('HH:mm'), endDate: moment(endDate).format('HH:mm') };
    return mustache.to_html(view, data);
  };
  
  return {    
    create : _create
  }
}();
module.exports = Schedule;