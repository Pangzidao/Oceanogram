console.log("oceanogram")

const placeDom = document.getElementById("place")
const maregraphieObservationApi = 'https://services.data.shom.fr/maregraphie/observation/json/3?sources=1&dtStart=2024-04-10T00%3A00%3A00Z&dtEnd=2024-04-11T00%3A00%3A00Z&interval=10';
const maregraphesListDom = document.getElementById("maregraphesList")

let maregraphesList = []

function getMaregraphesObservations(){
  fetch(maregraphieObservationApi)
  .then(response => {
    // Check if the response is successful (status code 200)
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    // Parse the JSON response
    return response.json();
  })
  .then(data => {
    // Handle the JSON data returned by the API
    console.log(data);
    drawDiagram(data.data)
    // Perform further processing or display the data on the webpage
  })
  .catch(error => {
    // Handle any errors that occurred during the fetch operation
    console.error('There was a problem with the fetch operation:', error);
  });

}

function drawDiagram(data){
    const yValues = [];
    const xValues = []
    let xValue = -1
    data.forEach(data => {
      xValue += 1
      // Push the value of each object into valuesArray
      yValues.push(data.value);
      xValues.push(xValue)
    });
  
  
    new Chart("myChart", {
      type: "line",
      data: {
        labels: xValues,
        datasets: [{
          fill: false,
          lineTension: 0,
          backgroundColor: "rgba(0,0,255,1.0)",
          borderColor: "rgba(0,0,255,0.1)",
          data: yValues
        }]
      },
      options: {
        legend: {display: false},
        scales: {
          yAxes: [{ticks: {min: 0, max:10}}],
        }
      }
    });
}

function getMaregraphes(){
    fetch('https://services.data.shom.fr/maregraphie/service/tidegauges')
    .then(response => {
      // Check if the response is successful (status code 200)
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Parse the JSON response
      return response.json();
    })
    .then(data => {
      // Handle the JSON data returned by the API
      console.log(data);
      data.forEach(data => maregraphesList.push(data))

      makeMaregraphesList(maregraphesList)
    })
    .catch(error => {
      // Handle any errors that occurred during the fetch operation
      console.error('There was a problem with the fetch operation:', error);
    });
}

function makeMaregraphesList(maregraphesList){
  maregraphesList.forEach(maregraphe => {
    maregraphesListDom.innerHTML += `<p class="maregraphe-name"> ${maregraphe.name}</p>`
    console.log(maregraphe.name)
  })
}

getMaregraphes()
getMaregraphesObservations()



