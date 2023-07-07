
let container = document.getElementById("containerCards")
console.log(container)



function crearMaqueta (objeto){
    return ` <div class="card">
    <img src=${objeto.image}>
    <div class="card-body">
        <div class="card-body">
            <h5 class="card-title">${objeto.name}</h5>
            <p class="card-text">${objeto.date}
                ${objeto.description} 
                "category": "Book Exchange",
                "place": "Room D1",
                "capacity": 150000,
                "assistance":123286,
                "price": 1</p>
            <a href="./index.html" class="btn btn-primary">Go back</a>
        </div>
    </div>
    `
}


function mostrarMaqueta(){
    for(let card of data.events){
        container.innerHTML = crearMaqueta(card)}
    }

mostrarMaqueta()    