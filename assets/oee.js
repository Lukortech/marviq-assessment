/********************************************************************

An OEE is a percentage calculated by multiplying 3 percentages:
Performance% = actual gross production / norm gross production * 100%
Availability% = actual uptime / norm uptime * 100%
Quality% = (actual gross production - actual scrap) / actual gross production * 100%

Assume a norm gross production of 30.000 bricks per hour.

Assume a norm uptime of 75% (is 16 hours / 24 hours).
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
  input.forEach(element => {
    console.log(element.OEE*element.PERFORMANCE*element.QUALITY);
  });
}