(function initializeDatabase(){
  fetch("https://www.marviq.com/assessment/index.php?page=a&from=2018-01-07%2000:00:00")
  .then( response => {
    if (!response.ok) { throw response }
    return response.json()
  })
  .then( json => {
    console.log("We have succesfully initialized your database!");
    
    view_netProduction(json);
    view_downtime(json);
    view_scrapVsGross(json);
    view_charts(json);
    setTimeout(function(){ //To make sure we had everything ready I am giving the browser 1s
      showPage();
    },1000);
  })
  .catch( err => {
    err.text().then( errorMessage => {
      console.error("We couldn't initialize the database. " + errorMessage);
    })
  })
})();



/* Functions below are made for future calculations to keep each function single-responsibility premise */

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



/* Functions below are made only for filling the page with the templates. */

function view_netProduction(input){
  var netProdList = document.querySelector("#netProdListing"); // Place where the output will be shown.

  let template = function(name, net){
    return `<div>
              <label>Net production of ${name}: </label>
              <input type="number" id="${name}_netprod" value="${net}" readonly="readonly">
            </div>`
  }
  
  input.forEach(machine => { 
    netProdList.innerHTML = netProdList.innerHTML + template(machine.MACHINE, netProduction(machine));
  });
}

function view_scrapVsGross(input){
  var scrapvgrossList = document.querySelector("#scrapVGrossListing"); // Place where the output will be shown.

  let template = function(name, scrap, gross){
    return `<div><label>Scrap vs Gross porduction of ${name}: </label><br/>
              <label>scrap: <input type="number" id="${name}_scrap" value="${scrap}" readonly="readonly"></label><br/>
              <label>gross: <input type="number" id="${name}_gross" value="${gross}" readonly="readonly"></label>
            </div>`
  }

  input.forEach(machine => { 
    scrapvgrossList.innerHTML = scrapvgrossList.innerHTML + template(machine.MACHINE, scrapVsGross(machine)[0], scrapVsGross(machine)[1]);
  });
  
}

function view_downtime(input){
  var dtList = document.querySelector("#dtlisting"); // Place where the output will be shown.

  let template = function(name, dt){
    return `<div>
              <label>Downtime of ${name}: </label>
              <input type="number" id="${name}_dtime" value="${dt}" readonly="readonly"> 
              <small> (In hours)</small><br/>
            </div>`
  }

  input.forEach(machine => { // walking through enire arry of machines and getiing each machine downtime + rounding up to better show data.
    dtList.innerHTML = dtList.innerHTML + template(machine.MACHINE, Math.round(downtime(machine) * 100) / 100);
  });
}



// Scripts below are mostly for the looks. But, hey! It's what matters in front-end!

function showPage() { // To avoid 'poping up' on user with the data.
  document.body.removeChild(document.querySelector(".loader"));
  document.body.removeChild(document.querySelector(".loader-welcomeMsg"));
  document.querySelector(".wrapper").style.display = "initial";
}
function hideElements(selectors){
  selectors.forEach(element => {
    document.querySelector(element).classList.remove('visible');
  });
}
function show_states(){
  hideElements(["#netProdListing","#dtlisting","#scrapVGrossListing","#netCharts"])
  document.querySelector("#states").classList.add('visible');
}
function show_net(){
  hideElements(["#states","#dtlisting","#scrapVGrossListing"])
  document.querySelector("#netProdListing").classList.add('visible');
  document.querySelector("#netCharts").classList.add('visible');
}
function show_dt(){
  hideElements(["#states","#netProdListing","#scrapVGrossListing","#netCharts"])
  document.querySelector("#dtlisting").classList.add('visible');
}
function show_svg(){
  hideElements(["#states","#netProdListing","#dtlisting","#netCharts"])
  document.querySelector("#scrapVGrossListing").classList.add('visible');
}