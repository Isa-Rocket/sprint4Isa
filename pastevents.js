//referencias
let divContenedor = document.getElementById("contenedor")
// let inputBusqueda = document.getElementById("search")
const container = document.getElementById("containerCards")
const containerCheckbox = document.getElementById("contenedor-checkbox")
const elSearch = document.getElementById("ventanita-search")

//fetch
let eventos;
let events;
let pastEvents

fetch("https://mindhub-xj03.onrender.com/api/amazing")
    .then(res => res.json())
    .then(data => {
        eventos = data.events
        currentDate = data.currentDate
        pastEvents= eventos.filter(event => event.date <= currentDate)
        let categorias = eventos.map(eventos => eventos.category)
        let categoriasSinrepetir = new Set(categorias)
        let categoriasUnicas = Array.from(categoriasSinrepetir)
        mostrarMaqueta(pastEvents)
        mostrarCheckbox(categoriasUnicas, containerCheckbox)
    })
    .catch(error => console.log(error))


//eventos
containerCheckbox.addEventListener("change", function (e) {
    let checkedCheckboxes = Array.from(document.querySelectorAll("input[type='checkbox']:checked"))
    let checkedCategories = checkedCheckboxes.map(checkbox => checkbox.value)
    let filteredEvents = eventos.filter(evento => checkedCategories.includes(evento.category))
    mostrarMaqueta(filteredEvents)
})
elSearch.addEventListener('keyup', () => {
    filtrarEventos(pastEvents, elSearch.value );
})
containerCheckbox.addEventListener("change", function (e) {
    filtrarEventos();
})
// inputBusqueda.addEventListener('keyup', () => {
//     filtrarEventos();
// })

//funciones
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
function filtrarPorBusqueda(eventosFiltrados, texto) {
    let valorBusqueda = elSearch.value.toLowerCase();
    let eventosFiltradosPorBusqueda = eventosFiltrados.filter(function (evento) {
        let coincidenciaNombre = evento.name.toLowerCase().search(texto) !== -1;
        let coincidenciaDescripcion = evento.description.toLowerCase().search(texto) !== -1;
        return coincidenciaNombre || coincidenciaDescripcion;
    });
    
    return eventosFiltradosPorBusqueda;
}
function filtrarPorCategoria(eventosFiltrados) {
    let checkedCheckboxes = Array.from(document.querySelectorAll("input[type='checkbox']:checked"))
    let checkedCategories = checkedCheckboxes.map(checkbox => checkbox.value)
    console.log(checkedCategories)
    let filteredEvents = eventosFiltrados.filter(evento => checkedCategories.includes(evento.category))
    return filteredEvents;
}
function filtrarEventos(array, texto) {
    let eventosFiltradosPorCategoria = filtrarPorCategoria(array);
    let eventosFiltradosPorBusquedaYCategoria = filtrarPorBusqueda(eventosFiltradosPorCategoria, texto);

    if (eventosFiltradosPorBusquedaYCategoria.length === 0) {
        container.innerHTML = "Categoría no encontrada";
    } else {
        mostrarMaqueta(eventosFiltradosPorBusquedaYCategoria);
    }
    return eventosFiltradosPorBusquedaYCategoria
}
