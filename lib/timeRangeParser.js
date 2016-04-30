var TimeRangeParser = function(){
	
  	var _getStartTime = function(timeRange, baseDate){
    	if(timeRange){
	    	var startTimeStr = timeRange.split('-')[0];
	    	if(startTimeStr.length == 5)
	    		return parseTime(startTimeStr, baseDate);
	    	else
	    		throw new Error(startTimeStr + ' is invalid time!');
    	}
    	else
    		throw new Error('timeRange is not defined!');
  	};
  	
  	var _getEndTime = function(timeRange, baseDate){
  		if(timeRange){
	    	var endTimeStr = timeRange.split('-')[1];
	    	if(endTimeStr.length == 5)
		    		return parseTime(endTimeStr, baseDate);
		    	else
		    		throw new Error(endTimeStr + ' is invalid time!');
  		}
  		else
    		throw new Error('timeRange is not defined!');
  	};
  	
		var parseTime = function(timeString, baseDate) {
			var timeParts = timeString.split(':').map(function(part){
				return parseInt(part);
			});
			
			var result = new Date(baseDate.getTime());
			result.setHours(timeParts[0] , timeParts[1], 0, 0);
			
			//return 'Date('+ result.getFullYear() +', '+ result.getMonth() +', '+ result.getDate() +', '+ result.getHours() +', '+ result.getMinutes() +', 0, 0)';
			
			return result;
		};
  
  	return {    
    	getStartTime: _getStartTime,
    	getEndTime: _getEndTime
  	};
}();
module.exports = TimeRangeParser;