
let container = document.getElementById("containerCards")
console.log(container)
let arrayEvents = data.events

const currentDate = data.currentDate

function crearMaqueta (objeto){
    return ` <div class="card">
    <img src="${objeto.image}">
    <div class="card-body">
        <h5 class="card-title">${objeto.name}</h5>
        <p class="card-text">${objeto.description}</p>
        
    </div>
    <div class="card-footer">
        <small class="text-body-secondary d-flex justify-content-between">
            <h4>$${objeto.price}</h4>
            <button>Details</button>
            <a href="./details.html"></a>
        </small>
    </div>
    `
}

function mostrarMaqueta(array, date){

    for(let card of array){
        
        if (date < card.date){
            container.innerHTML += crearMaqueta(card)
        }
    }
}

mostrarMaqueta(arrayEvents, currentDate)    