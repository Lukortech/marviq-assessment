(function initializeStates(){
  fetch("https://www.marviq.com/assessment/index.php?page=b&from=2018-01-07%2000:00:00")
  .then( response => {
    if (!response.ok) { throw response }
    return response.json()
  })
  .then( json => {
    view_states(json);
  })
  .catch( err => {
    err.text().then( errorMessage => {
      console.error("There was an error: assessing machines states. " + errorMessage);
    })
  })
})();




function view_states(resource){
  var smth = document.querySelector("#states"); // Place where the output will be shown.
  
  var smth2 = Object.entries(resource);
  let template = function(name,value,color='green'){
    return `<div>
              <label style="color:${color}">State of ${name} machine: </label>
              <input type="text" value="${value}" readonly="readonly">
            </div>`;
  }

  smth2.forEach(machine => {
    smth.innerHTML = smth.innerHTML + template(machine[0],machine[1].split("/")[0],machine[1].split("/")[1]);
  });
}