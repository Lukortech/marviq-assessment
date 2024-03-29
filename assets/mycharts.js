function draw_chart(input,arg){

  var dataToFill = retriveChartData(input,arg);

  // Load google charts
  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(drawChart);

  // Draw the chart and set the chart values
  function drawChart() {
    var data = google.visualization.arrayToDataTable(
      dataToFill
    );

    // Optional; add a title and set the width and height of the chart
    
    var options = {'title':`Net production of Machine${arg+1}`, 'width':550, 'height':400, 'colors': ['#3498db', '#364652', '#A1C6EA', '#374A67', '#CCDBDC']};

    // Display the chart inside the <div> element with id="piechart"
    var chart = new google.visualization.BarChart(document.querySelector(`#piechart${arg}`));
    chart.draw(data, options);
  }
}

//A graph/table showing the net production (gross production – scrap) for every hour.

function retriveChartData(input,arg){
  var machineEntries = Object.entries(input[arg]);
  var scrap_percentage = Number(machineEntries[27][1]);
  machineEntries.splice(0,3);
  machineEntries.splice(-3);
  for (let index = 0; index < machineEntries.length; index++) {
    machineEntries[index][1] = Number(machineEntries[index][1]) - (Number(machineEntries[index][1]) * scrap_percentage);
  }
  machineEntries.splice(0,0,["Hour", "Net production"]);
  //foreach machineEntries[1] reassign value by scrap_percentage
  return machineEntries;
}


function view_charts(input){
  draw_chart(input,0);
  draw_chart(input,1);
  draw_chart(input,2);
}
