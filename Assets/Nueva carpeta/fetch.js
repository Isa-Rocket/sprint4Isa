// Hacer fecth a una de las siguiente APIs
// https://apisimpsons.fly.dev/api/personajes (API Simpsons)
// https://hp-api.onrender.com/api/characters (API Harry Potter)
// https://www.moogleapi.com/api/v1/characters (API Final Fantasy)

let personajes;

fetch("https://apisimpsons.fly.dev/api/personajes?limit=20")
    .then(res => res.json())
    .then(data => {
        personajes = data.docs
        console.log(personajes)
        imprimirNombresPorConsola(personajes)
    })
    .catch(error => console.log(error))

function imprimirNombresPorConsola(array) {
    for (let personaje of array) {
        console.log(personaje.Nombre);
    }
}
//console.log(fetch("https://apisimpsons.fly.dev/api/personajes"))
