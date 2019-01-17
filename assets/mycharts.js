
function chart1(){
  var data = {
    labels: ['Bananas', 'Apples', 'Grapes'],
    series: [5, 2, 5]
  };
  var options = {
    labelInterpolationFnc: function(value) {
      return value[0]
    }
  };
  var responsiveOptions = [
    ['screen and (min-width: 640px)', {
      chartPadding: 10,
      labelOffset: 40,
      labelDirection: 'explode',
      labelInterpolationFnc: function(value) {
        return value;
      }
    }],
    ['screen and (min-width: 1024px)', {
      labelOffset: 40,
      chartPadding: 10
    }]
  ];
  new Chartist.Pie('#chart1', data, options, responsiveOptions);
}



function chart2(){
  var data = {
    labels: ['mangos', 'kiwis', 'marakujas'],
    series: [1, 4, 12]
  };
  var options = {
    labelInterpolationFnc: function(value) {
      return value[0]
    }
  };
  var responsiveOptions = [
    ['screen and (min-width: 640px)', {
      chartPadding: 10,
      labelOffset: 40,
      labelDirection: 'explode',
      labelInterpolationFnc: function(value) {
        return value;
      }
    }],
    ['screen and (min-width: 1024px)', {
      labelOffset: 40,
      chartPadding: 10
    }]
  ];
  new Chartist.Pie('#chart2', data, options, responsiveOptions);
}
function chart3(labels,series){
  var data = {
    labels: labels,
    series: series
  };
  var options = {
    labelInterpolationFnc: function(value) {
      return value[0]
    }
  };
  var responsiveOptions = [
    ['screen and (min-width: 640px)', {
      chartPadding: 10,
      labelOffset: 40,
      labelDirection: 'explode',
      labelInterpolationFnc: function(value) {
        return value;
      }
    }],
    ['screen and (min-width: 1024px)', {
      labelOffset: 40,
      chartPadding: 10
    }]
  ];
  new Chartist.Pie('#chart3', data, options, responsiveOptions);
}