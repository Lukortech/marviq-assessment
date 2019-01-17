/* TASK PREVIEW
Produce a page to report the machine statuses of the last 24 hours in the database (e.g. January 7th).



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



var MACHINESDETAILEDINFORMATION;
(function InitializeDatabase(){
  
  fetch("https://www.marviq.com/assessment/index.php?page=a&from=2018-01-07%2000:00:00")
  .then( response => {
    if (!response.ok) { throw response }
    return response.json()  //we only get here if there is no error
  })
  .then( json => {
    console.warn("We have succesfully initialized your database! [check `machinesDetailedInformation`]");
    MACHINESDETAILEDINFORMATION = json;
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





/* TASK REALTED FILTERS */

//The total net production for the machine (gross output minus scrap).
function netProduction(object){
  var netProd = object.PRODUCTION-(object.PRODUCTION*object.SCRAP_PERCENTAGE);
  return Number(netProd);
}
//The percentage of scrap vs gross production.
function scrapVsGross(object){
  var grossProd = object.PRODUCTION;
  var scrap = object.PRODUCTION*object.SCRAP_PERCENTAGE;
  return  Number(grossProd), Number(scrap);
}
//The percentage of downtime for a machine.
function downtime(object){
  var dt = 24*object.DOWNTIME_PERCENTAGE;
  return Number(dt); //5.83333333333344 form m0 ( in hours )
}





function view_netProduction(){
  var DTList = document.querySelector("#dtlisting"); // Place where the output will be shown.
  
  DTList.innerHTML = ''; // Cleaning it up, before update.

  let tag_template = function(name, dt){
    return `<label>Downtime of ${name}: <input type="number" id="${name}_dtime" value="${dt}" readonly="readonly"></label>`
  }

  MACHINESDETAILEDINFORMATION.forEach(machine => { // walking through enire arry of machines and getiing each machine downtime + rounding up to better show data.
    DTList.innerHTML = DTList.innerHTML + tag_template(machine.MACHINE, Math.round(downtime(machine) * 100) / 100);
  });
  DTList.innerHTML = DTList.innerHTML + `<button onclick="view_netProduction();">update net production</button>`; // Inserting the button to keep the manual update() function availible for user
}

