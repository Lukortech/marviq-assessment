/* TASK PREVIEW
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
    return response.json()
  })
  .then( json => {
    console.log("We have succesfully initialized your database! [check `machinesDetailedInformation`]");
    MACHINESDETAILEDINFORMATION = json; //Polluting global scope for other script to have access to data fetched
    //After loading database the site produces the output. I chose inputs so It's easier to retrive data from it and then work on it in console for developer use.
    view_netProduction();
    view_downtime();
    view_scrapVsGross();
    view_charts();
    setTimeout(function(){
      showPage();
    },1000);
  })
  .catch( err => {
    err.text().then( errorMessage => {
      console.error("We couldn't initialize the database. " + errorMessage);
    })
  })
})();




//The total net production for the machine (gross output minus scrap).
function netProduction(object){
  var netProd = object.PRODUCTION-(object.PRODUCTION*object.SCRAP_PERCENTAGE);
  return Number(Math.round(netProd * 100) / 100);
}
//The percentage of scrap vs gross production.
function scrapVsGross(object){
  var grossProd = object.PRODUCTION;
  var scrap = object.PRODUCTION*object.SCRAP_PERCENTAGE;
  return [Number(Math.round(scrap * 100) / 100) , Number(grossProd)];
}
//The percentage of downtime for a machine.
function downtime(object){
  var dt = 24*object.DOWNTIME_PERCENTAGE;
  return Number(dt); //5.83333333333344 form m0 ( in hours )
}








// All functions below are being calld when data is being fetched correcly. 
// If I had more time I'd make it appear slowly instead of jumping at user out of nowhere! :)
function view_netProduction(){
  var netProdList = document.querySelector("#netProdListing");
  
  netProdList.innerHTML = ''; 

  let tag_template = function(name, net){
    return `<div><label>Net production of ${name}: </label><input type="number" id="${name}_netprod" value="${net}" readonly="readonly"></div>`
  }

  MACHINESDETAILEDINFORMATION.forEach(machine => { 
    netProdList.innerHTML = netProdList.innerHTML + tag_template(machine.MACHINE, netProduction(machine));
  });
  netProdList.innerHTML = netProdList.innerHTML + `<!--<button onclick="view_netProduction();">update net production</button>-->`; 
}

function view_scrapVsGross(){
  var scrapvgrossList = document.querySelector("#scrapVGrossListing");
  
  scrapvgrossList.innerHTML = ''; 

  let tag_template = function(name, scrap, gross){
    return `<div><label>Scrap vs Gross porduction of ${name}: </label><br/>
              <label>scrap: <input type="number" id="${name}_scrap" value="${scrap}" readonly="readonly"></label><br/>
              <label>gross: <input type="number" id="${name}_gross" value="${gross}" readonly="readonly"></label>
            </div>`
  }

  MACHINESDETAILEDINFORMATION.forEach(machine => { 
    scrapvgrossList.innerHTML = scrapvgrossList.innerHTML + tag_template(machine.MACHINE, scrapVsGross(machine)[0], scrapVsGross(machine)[1]);
  });
  scrapvgrossList.innerHTML = scrapvgrossList.innerHTML + `<!--<button onclick="view_scrapVsGross();">update scrap v gross</button>-->`; 
}

function view_downtime(){
  var dtList = document.querySelector("#dtlisting"); // Place where the output will be shown.
  
  dtList.innerHTML = ''; // Cleaning it up, before update.

  let tag_template = function(name, dt){
    return `<div><label>Downtime of ${name}: </label><input type="number" id="${name}_dtime" value="${dt}" readonly="readonly"> <small> (In hours)</small><br/></div>`
  }

  MACHINESDETAILEDINFORMATION.forEach(machine => { // walking through enire arry of machines and getiing each machine downtime + rounding up to better show data.
    dtList.innerHTML = dtList.innerHTML + tag_template(machine.MACHINE, Math.round(downtime(machine) * 100) / 100);
  });
  dtList.innerHTML = dtList.innerHTML + `<!--<button onclick="view_downtime();">update downtime</button>-->`; // Inserting the button to keep the manual update() function availible for user
}





function showPage() {
  document.body.removeChild(document.querySelector(".loader"));
  document.body.removeChild(document.querySelector(".loader-welcomeMsg"));
  document.querySelector(".wrapper").style.display = "block";
}