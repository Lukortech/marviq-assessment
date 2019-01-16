/* TASK PREVIEW
Produce a page to report the machine statuses of the last 24 hours in the database (e.g. January 7th).

The total net production for the machine (gross output minus scrap).
function netProduction(machine){
  return machine.PRODUCTION-(machine.PRODUCTION*machine.SCRAP_PERCENTAGE);
}
The percentage of scrap vs gross production.
function scrapVsGross(machine){
  var gross = machine.PRODUCTION;
  var scrap = machine.PRODUCTION*machine.SCRAP_PERCENTAGE;
  return 
}











The percentage of downtime for a machine.
A graph/table showing the net production (gross production – scrap) for every hour.

As a front end: [ https://www.marviq.com/assessment/index.php?page=a&from=2018-01-07%2000:00:00 ]


DATA PREVIEW
DATETIME_FROM: "2018-01-07 00:00:00"
DATETIME_TO: "2018-01-08 00:00:00"
DOWNTIME_PERCENTAGE: 0.24305555555556
H0: 19078,H1: 19607,H2: 22538,H3: 19520,H4: 25549,H5: 23444,H6: 25238,H7: 21743,H8: 28107,H9: 21086,H10: 23518,H11: 22287,H12: 20003,H13: 30232,H14: 26812,H15: 24325,H16: 20233,H17: 22770,H18: 25661,H19: 25736,H20: 19507,H21: 20391,H22: 29299,H23: 12330
MACHINE: "2x2 brick mould"
PRODUCTION: 549014
SCRAP_PERCENTAGE: 0.034238792002505
*/

/* CHART related stuff */

(function chart1(){
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
      chartPadding: 30,
      labelOffset: 100,
      labelDirection: 'explode',
      labelInterpolationFnc: function(value) {
        return value;
      }
    }],
    ['screen and (min-width: 1024px)', {
      labelOffset: 40,
      chartPadding: 20
    }]
  ];
  new Chartist.Pie('.ct-chart', data, options, responsiveOptions);
})();



(function chart2(){
  var data = {
    labels: ['mangos', 'kiwis', 'marakujas'],
    series: [5, 2, 5]
  };
  var options = {
    labelInterpolationFnc: function(value) {
      return value[0]
    }
  };
  var responsiveOptions = [
    ['screen and (min-width: 640px)', {
      chartPadding: 30,
      labelOffset: 100,
      labelDirection: 'explode',
      labelInterpolationFnc: function(value) {
        return value;
      }
    }],
    ['screen and (min-width: 1024px)', {
      labelOffset: 40,
      chartPadding: 20
    }]
  ];
  new Chartist.Pie('.ct-chart', data, options, responsiveOptions);
})();



var machinesDetailedInformation;
(function InitializeDatabase(){
  
  fetch("https://www.marviq.com/assessment/index.php?page=a&from=2018-01-07%2000:00:00")
  .then( response => {
    if (!response.ok) { throw response }
    return response.json()  //we only get here if there is no error
  })
  .then( json => {
    console.warn("We have succesfully initialized your database! [check `machinesDetailedInformation`]");
    machinesDetailedInformation = json;
    (function popup(){
      var flasher = `<span class="flasher">We have initialized the database! you're good to go! <i style="cursor:pointer;" class="fas fa-times" onclick="deleteFlasher();"></i></span>`;
      document.body.innerHTML = document.body.innerHTML + flasher;
    })();
  })
  .catch( err => {
    err.text().then( errorMessage => {
      console.log("We couldn't initialize the database." + errorMessage);
    })
  })
})();

//Small popup to let you know everything is fine
function deleteFlasher(){ 
  document.body.removeChild(document.querySelector(".flasher"));
};
function getCertainMachine(number){
  return machinesDetailedInformation[number];
}