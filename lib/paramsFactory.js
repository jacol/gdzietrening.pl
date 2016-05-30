var ParamsFactory = function(){
  
  var _createBackwardParams = function(city, day, hour, limit){
    if(hour - limit < 5){
      day = prevDay(day);
      hour = 24 - limit;
    }
    else{
      hour = hour - limit;
    }
    
    return '/' + city + '/' + day + '/' + hour + '/' + limit;
  }
  
  
  var _createForwardParams = function(city, day, hour, limit){
    if(hour + limit > 22){
      day = nextDay(day);
      hour = 5;
    }
    else{
      hour = hour + limit;
    }
    
    return '/' + city + '/' + day + '/' + hour + '/' + limit;
  }
  
  var nextDay = function(day){
    switch(day){
    	case 'poniedzialek': return 'wtorek';
    	case 'wtorek': return 'sroda';
    	case 'sroda': return 'czwartek';
    	case 'czwartek': return 'piatek';
    	case 'piatek': return 'sobota';
    	case 'sobota': return 'niedziela';
    	case 'niedziela': return 'poniedzialek';
    }
  }
  
  var prevDay = function(day){
    switch(day){
    	case 'poniedzialek': return 'niedziela';
    	case 'wtorek': return 'poniedzialek';
    	case 'sroda': return 'wtorek';
    	case 'czwartek': return 'sroda';
    	case 'piatek': return 'czwartek';
    	case 'sobota': return 'piatek';
    	case 'niedziela': return 'sobota';
    }
  }

  return {
    createForwardParams: _createForwardParams,
    createBackwardParams: _createBackwardParams
  };
}();

module.exports = ParamsFactory;