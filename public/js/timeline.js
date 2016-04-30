var Timeline = function(city, day, limit, hour, containerName) {
    var city = city;
    var day = day;
    var limit = limit;
    var hour = hour;
    var containerName = containerName;
    
    this.draw = function() {
        var container = document.getElementById(containerName);
        var chart = new google.visualization.Timeline(container);
        var dataTable = new google.visualization.DataTable();
        
        dataTable.addColumn({ type: 'string', id: 'Klub' });
        dataTable.addColumn({ type: 'string', id: 'Zajęcia' });
        dataTable.addColumn({ type: 'datetime', id: 'Początek' });
        dataTable.addColumn({ type: 'datetime', id: 'Koniec' });
        dataTable.addColumn({'type': 'string', 'role': 'tooltip', 'p': {'html': true}});
        
        $.getJSON( "/schedule/" + city + '/' + day + '/' + hour + '/' + limit, function( data ) {
            
            var timelineData = [];
            
            data.forEach(function(item){
              var dateFrom = moment(item[2]).toDate();
              var dateTo = moment(item[3]).toDate();
              var tooltipHtml = item[5];
              timelineData.push([item[0], item[1], dateFrom, dateTo, tooltipHtml]);
            });
            
            dataTable.addRows(timelineData);
    
            var options = {
              hAxis: { 
                slantedText: true,
                format: 'HH:mm',
                textStyle:{color: '#FFF'}
              },
              //timeline: { colorByRowLabel: true },
              rowLabelStyle: {
                fontName: 'Roboto Condensed',
                fontSize: 13,
                color: '#FFFFFF'
              },
              tooltip: {isHtml: true}
              //focusTarget: 'category'
            };
        
            chart.draw(dataTable, options);
            var selectEvent;
            
            function myClick(e){
                var selectedItem = chart.getSelection()[0];
                  if (selectedItem) {
                    var id = data[selectedItem.row][4];
                    showUrlInDialog(id);
                    google.visualization.events.removeListener(selectEvent);
                    chart.setSelection([]);
                    selectEvent = google.visualization.events.addListener(chart, 'select', myClick);
                  }
            }
            
            function myOverHandler(e){
                if(e.row != null){
                    $(".google-visualization-tooltip").html(dataTable.getValue(e.row,4)).css({width:"auto",height:"auto"});
                    document.body.style.cursor = "pointer"
                }
            }
            
            function myOutHandler(e){
                if(e.row != null){
                    document.body.style.cursor = "default"
                }
            }

            google.visualization.events.addListener(chart, 'onmouseover', myOverHandler);
            google.visualization.events.addListener(chart, 'onmouseout', myOutHandler);
            selectEvent = google.visualization.events.addListener(chart, 'select', myClick);
            
            
            $("svg g:nth-child(3) text").each(function( index ) {
              $( this ).attr('fill', '#FFFFFF');                      //zmiana koloru godzin pod wykresem
            });
        });
    };
    
    function showUrlInDialog(id){
      $.ajax({
        url: 'facilities/' + id,
        success: function(data) {
          document.body.style.cursor = "default"
          $("#facility-dialog").html(data);
            
          $("#facility-dialog-data").dialog({
            modal:true, 
            width:800, 
            height:600,
            buttons: { "Ok": function(){ $(this).dialog("close");}}
          }).dialog('open');
        }
      });
    }   
}
