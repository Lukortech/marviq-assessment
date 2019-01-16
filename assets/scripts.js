// As a front end: [ https://www.marviq.com/assessment/index.php?page=a&from=2018-01-07%2000:00:00 ]


/*
    function handleDaterange(){
      console.log("Form submitted!");
    }
    var dateForm = document.querySelector("#dateRange");
    if(dateForm.addEventListener){
      dateForm.addEventListener("submit", handleDaterange, false);  //Modern browsers
    }else if(dateForm.attachEvent){
      dateForm.attachEvent('onsubmit', handleDaterange);            //Old IE
    }
*/

/* CHART related stuff */

(function chart1(...args){
  console.log("I am off to work!");
  var data = {
    labels: ['Bananas', 'Apples', 'Grapes'],
    series: [3, 2, 5],
    somestuff : [args]
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
      labelOffset: 80,
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
    console.warn("We have succesfully initialized your database!");
    console.log(json);
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

function deleteFlasher(){ 
  document.body.removeChild(document.querySelector(".flasher"));
};

function getCertainMachine(number){
  console.log(machinesDetailedInformation[number]);

}

function chosenMachine(startH, endH, name, option) {
  this.startH = startH;
  this.endH = endH;
  this.name = name;
  this.option = option;
}


// var machine1 = new chosenMachine(machinesDetailedInformation[0].H0, machinesDetailedInformation[0].H23, machinesDetailedInformation[0].MACHINE, machinesDetailedInformation[0].PRODUCTION);