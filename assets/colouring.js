//{"2x2 brick mould":"warning\/orange","3x2 brick mould":"fatal\/red","4x2 brick mould":"good\/green"}
/* 

Assignment B
Indicate (using colors or text) another status of the machine based on it’s core temperature over de last 24 hours.

Use good/green as default
Use warning/orange if the temperature has been over 85, but under or equal to 100 degrees for more than 15 minutes.
Use fatal/red when [higher than 100 degrees] or [higher than 85 degrees for longer than 15 minutes].

*/

(function initializeStates(){
  fetch("https://www.marviq.com/assessment/index.php?page=b&from=2018-01-07%2000:00:00")
  .then( response => {
    if (!response.ok) { throw response }
    return response.json()
  })
  .then( json => {
    console.log("States: ", json);
    MACHINESSTATES = json;
    view_states(MACHINESSTATES);
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