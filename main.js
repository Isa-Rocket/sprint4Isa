//referencias
let divContenedor = document.getElementById("contenedor")
let inputBusqueda = document.getElementById("search")
const container = document.getElementById("containerCards")
const containerCheckbox = document.getElementById("contenedor-checkbox")
const elSearch = document.getElementById("el-search")
const resultados = document.getElementById("containerCards");

//declaraciones
let eventos;
let events;

//fetch 
fetch("https://mindhub-xj03.onrender.com/api/amazing")
    .then(res => res.json())
    .then(data => {
        eventos = data.events
        let categorias = eventos.map(eventos => eventos.category)
        let categoriasSinrepetir = new Set(categorias)
        let categoriasUnicas = Array.from(categoriasSinrepetir)
        console.log(categoriasUnicas)
        mostrarMaqueta(eventos)
        mostrarCheckbox(categoriasUnicas, containerCheckbox)
        containerCheckbox.addEventListener("change", function (e) {
            let checkedCheckboxes = Array.from(document.querySelectorAll("input[type='checkbox']:checked"))
            let checkedCategories = checkedCheckboxes.map(checkbox => checkbox.value)
            let filteredEvents = eventos.filter(evento => checkedCategories.includes(evento.category))
            mostrarMaqueta(filteredEvents)
        })
        elSearch.addEventListener('keyup', () => {
            filtrarPorBusqueda(eventos);
        })
        containerCheckbox.addEventListener("change", function (e) {
            filtrarEventos();
        })
    })
    .catch(error => console.log(error))

//event listener
elSearch.addEventListener("input", function () {
    let eventosFiltrados = filtrarPorBusqueda(eventos);
    mostrarEventos(eventosFiltrados);
});

//funciones
function filtrarPorBusqueda(eventosFiltrados) {
    let valorBusqueda = elSearch.value.toLowerCase();
    let eventosFiltradosPorBusqueda = eventosFiltrados.filter(function (evento) {
        let coincidenciaNombre = evento.name.toLowerCase().startsWith(valorBusqueda);
        let coincidenciaDescripcion = evento.description.toLowerCase().startsWith(valorBusqueda);
        return coincidenciaNombre || coincidenciaDescripcion;
    });

    return eventosFiltradosPorBusqueda;
}
function mostrarEventos(eventos) {
    resultados.innerHTML = "";
    for (let card of eventos) {
        container.innerHTML += crearMaqueta(card)
    };
}
function crearMaqueta(objeto) {
    return ` 
    <div class="card">
    <img src="${objeto.image}">
    <div class="card-body">
        <h5 class="card-title">${objeto.name}</h5>
        <p class="card-text">${objeto.description}</p> 
    </div>
    <div class="card-footer">
        <small class="text-body-secondary d-flex justify-content-between">
            <h4>$${objeto.price}</h4>
            <a class="btn btn-primary" href="./details.html?parametro=${objeto._id}">See more</a>
        </small>
    </div>
    `
}
function mostrarMaqueta(eventos) {
    container.innerHTML = "";
    for (let card of eventos) {
        container.innerHTML += crearMaqueta(card)
    }
}
function filtrarEventos() {
        let checkedCheckboxes = Array.from(document.querySelectorAll("input[type='checkbox']:checked"));
        let checkedCategories = checkedCheckboxes.map(checkbox => checkbox.value);
        let filteredEvents = eventos.filter(evento => checkedCategories.includes(evento.category));
        mostrarMaqueta(filteredEvents);
} 

function crearCheckbox(categoria) {
    return `
    <label for = ${categoria}>${categoria}</label>
    <input type="checkBox" name=""
    id =${categoria} value = '${categoria}'></input>
    
    `
}
function mostrarCheckbox(array, donde) {
    for (let elemento of array) {
        donde.innerHTML += crearCheckbox(elemento)
    }
}
function filtrarPorCategoria(eventosFiltrados) {
    let checkedCheckboxes = Array.from(document.querySelectorAll("input[type='checkbox']:checked"))
    let checkedCategories = checkedCheckboxes.map(checkbox => checkbox.value)
    let filteredEvents = eventosFiltrados.filter(evento => checkedCategories.includes(evento.category))
    return filteredEvents;
}