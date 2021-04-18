const characterCount = document.getElementById("character");
const moonsCount = document.getElementById("moons");
const planetsCount = document.getElementById("planets");
const spaceshipCount = document.getElementById("spaceship");

fillCount();

function fillCount(){
    Promise.all([swapiGet('people/'),
                 swapiGet('vehicles/'),
                 swapiGet('planets/'),
                 swapiGet('starships/')
                ]).then(function (results){
        console.log(results)
        characterCount.innerHTML = results[0].data.count;
        moonsCount.innerHTML = results[1].data.count;
        planetsCount.innerHTML = results[2].data.count;
        spaceshipCount.innerHTML = results[3].data.count;
    })
}

function swapiGet(param) {
   return axios.get(`https://swapi.dev/api/${param}`)
}