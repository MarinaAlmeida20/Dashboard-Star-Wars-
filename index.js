const characterCount = document.getElementById("character");
const moonsCount = document.getElementById("moons");
const planetsCount = document.getElementById("planets");
const spaceshipCount = document.getElementById("spaceship");

fillCount();
fillTable()

// Google chart

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

async function drawChart() {
    const response = await swapiGet("vehicles/");
    const vehiclesArray = response.data.results;
    console.log(vehiclesArray)

    const dataArray = [];
    dataArray.push(["Vehicles", "Passangers"]);
    vehiclesArray.forEach((vehicle) => {
        dataArray.push([vehicle.name, Number(vehicle.passengers)]);
    });

    var data = google.visualization.arrayToDataTable(dataArray);

    var options = {
        title: 'The big vehicles',
        legend: 'none'
    };

    var chart = new google.visualization.PieChart(document.getElementById('piechart'));

    chart.draw(data, options);
}

// Top cards

function fillCount(){
    Promise.all([swapiGet('people/'),
                 swapiGet('vehicles/'),
                 swapiGet('planets/'),
                 swapiGet('starships/')
                ]).then(function (results){
        // console.log(results)
        characterCount.innerHTML = results[0].data.count;
        moonsCount.innerHTML = results[1].data.count;
        planetsCount.innerHTML = results[2].data.count;
        spaceshipCount.innerHTML = results[3].data.count;
    })
}

// Table 

async function fillTable() {
    const response = await swapiGet('films/');
    const tableData = response.data.results;
    // console.log(tableData);
    tableData.forEach(film => {
        $("#filmsTable").append(
            `<tr>
            <td>${film.title}</td>
            <td>${moment(film.release_date).format('DD/MM/YYYY')}</td>
            <td>${film.director}</td>
            <td>${film.episode_id}</td>
            </tr>`);
    })
    
}

// API swapi

function swapiGet(param) {
   return axios.get(`https://swapi.dev/api/${param}`)
}