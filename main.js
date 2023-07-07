
let container = document.getElementById("containerCards")
console.log(container)



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
            <a class="btn btn-primary" href="./details.html">See more</a>
        </small>
    </div>
    `

}


function mostrarMaqueta(){
    for(let card of data.events){
        container.innerHTML += crearMaqueta(card)}
    }

mostrarMaqueta()    