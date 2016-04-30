var WeekDay = function(){
	var weekDays = [ 'sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat' ];
	
  	var _getDayOfWeek = function(date){
    	return weekDays[date.getDay()];
  	};
  	
  	var _getDateForDay = function(day, currentDate){
  	  var dayNum = currentDate.getDay();
  	  var target = weekDays.indexOf(day);
  	  var offset = target >= dayNum ? target - dayNum : 7 - (dayNum - target);
  	  var result = new Date(currentDate);
  	  result.setDate(result.getDate() + offset);
  	  return result;
  	};
  
  	return {    
    	getDayOfWeek    : _getDayOfWeek,
    	getDateForDay   : _getDateForDay
  	};
}();
module.exports = WeekDay;