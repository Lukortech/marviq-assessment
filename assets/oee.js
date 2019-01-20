/********************************************************************

An OEE is a percentage calculated by multiplying 3 percentages:
Performance% = actual gross production / norm gross production * 100%
Availability% = actual uptime / norm uptime * 100%
Quality% = (actual gross production - actual scrap) / actual gross production * 100%

Assume a norm gross production of 30.000 bricks per hour.

Assume a norm uptime of 75% (is 16 hours / 24 hours).


NOTE: I am somewhat puzzled about the API returning the data needed for operations, so why should I calculate it all? 
I might have gotten it wrong, please let me know if I did. 
********************************************************************/

(function lol(){
  fetch("https://www.marviq.com/assessment/index.php?page=c&from=2018-01-07%2000:00:00")
  .then( response => {
    if (!response.ok) { throw response }
    return response.json()
  })
  .then( json => {
    oee(json);
  })
  .catch( err => {
    err.text().then( errorMessage => {
      console.error("There was an error: assessing machines states. " + errorMessage);
    })
  })
})();

function oee(input){
  var oeeElem = document.querySelector("#oee"); // Place where the output will be shown.

  let template = function(name, value){
    return `<div>
              <label>OEE of ${name}: </label>
              <input type="number" value="${value}" readonly="readonly"> 
              <small> %</small><br/>
            </div>`
  }
  var oee = function(machine){
    return Math.round(machine.OEE*machine.PERFORMANCE*machine.QUALITY *100)/ 100;
  }
  input.forEach(element => {
    oeeElem.innerHTML = (oeeElem.innerHTML + template(element.MACHINE,oee(element)));
  });
}