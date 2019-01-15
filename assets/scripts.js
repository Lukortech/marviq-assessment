/* The data per machine is of the following type:
**  Machine name
**  Variable name
**  Datetime from
**  Datetime to
**  Value in that timeframe


Each machine produces this set of data for (variable names)
PRODUCTION: Number of pieces produced (gross output including bad ones)
SCRAP: Number of pieces which are bad (these will be reground and fed into the machine’s PET intake again)
CORE TEMPERATURE: The temperature in degrees Celsius of the machine.

On top of that the machine will tell the DB application whether or not it is running. Every change in this state will be stored in the DB application using the following scheme:

Machine name
Datetime
IsRunning

When a machine is running it is called ‘uptime’. When a machine is not running it is called ‘downtime’.
Assume machines in the factory are planned to run 24/7.
*/

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
      setTimeout(function(){ 
        document.body.innerHTML = document.body.innerHTML + 
    `<span style="position:fixed; top:0; background: #CCC; width:100%;">We have initialized the databes! you're good to go!</span>`;
       }, 5000);
    })();
    //this.props.dispatch(doSomethingWithResult(json)) 
  })
  .catch( err => {
    err.text().then( errorMessage => {
      console.log("We couldn't initialize the database." + errorMessage);
      //this.props.dispatch(displayTheError(errorMessage))
    })
  })
})();
function filterMachines(number){
  machinesDetailedInformation.forEach(machine => {
    
  });
}


/*

document.body.innerHTML = document.body.innerHTML + 
    `<span style="position:fixed; top:0; background: #CCC; width:100%;">We have initialized the databes! you're good to go!</span>`;

*/