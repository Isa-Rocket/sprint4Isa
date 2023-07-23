//referencias
let divContenedor = document.getElementById("contenedor");
let inputBusqueda = document.getElementById("search");
const container = document.getElementById("containerCards");
const containerCheckbox = document.getElementById("contenedor-checkbox");
const elSearch = document.getElementById("el-search");

//declaraciones
let eventos;
let events;

//fetch
fetch("https://mindhub-xj03.onrender.com/api/amazing")
    .then((res) => res.json())
    .then((data) => {
        eventos = data.events;
        let categorias = eventos.map((eventos) => eventos.category);
        let categoriasSinrepetir = new Set(categorias); 
        let categoriasUnicas = Array.from(categoriasSinrepetir);
        console.log(categoriasUnicas);
        mostrarMaqueta(eventos);
        mostrarCheckbox(categoriasUnicas, containerCheckbox);
        containerCheckbox.addEventListener("change", function (e) {
            let eventosFiltrados = filtrarEventos(eventos);
            mostrarEventos(eventosFiltrados);
        });
    })
    .catch((error) => console.log(error));

//event listener
elSearch.addEventListener("input", function () {
    console.log("Controlador de eventos ejecutado");
    let eventosFiltrados = filtrarEventos(eventos);

    console.log(eventosFiltrados);
    mostrarEventos(eventosFiltrados);
});

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
    `;
}
function mostrarMaqueta(eventos) {
    container.innerHTML = "";
    for (let card of eventos) {
        container.innerHTML += crearMaqueta(card);
    }
}
function crearCheckbox(categoria) {
    return `
    <label for = ${categoria}>${categoria}</label>
    <input type="checkBox" name=""
    id =${categoria} value = '${categoria}'></input>
    
    `;
}
function mostrarCheckbox(array, donde) {
    for (let elemento of array) {
        donde.innerHTML += crearCheckbox(elemento);
    }
}
function filtrarPorCategoria(eventosFiltrados) {
    let checkedCheckboxes = Array.from(
        document.querySelectorAll("input[type='checkbox']:checked")
    );
    if (checkedCheckboxes.length === 0) {
        return eventosFiltrados;
    }
    let checkedCategories = checkedCheckboxes.map((checkbox) => checkbox.value);
    let filteredEvents = eventosFiltrados.filter((evento) =>
        checkedCategories.includes(evento.category)
    );
    return filteredEvents;
}
function filtrarPorBusqueda(eventosFiltrados) {
    console.log("Función filtrarPorBusqueda ejecutada", eventosFiltrados);
    let valorBusqueda = elSearch.value.toLowerCase();
    console.log("valorBusqueda:", valorBusqueda);
    let eventosFiltradosPorBusqueda = eventosFiltrados.filter(function (evento) {
        let coincidenciaNombre = evento.name
            .toLowerCase()
            .startsWith(valorBusqueda);
        let coincidenciaDescripcion = evento.description
            .toLowerCase()
            .startsWith(valorBusqueda);
        console.log(
            "coincidenciaNombre:",
            coincidenciaNombre,
            "coincidenciaDescripcion:",
            coincidenciaDescripcion
        );
        return coincidenciaNombre || coincidenciaDescripcion;
    });
    console.log("eventosFiltradosPorBusqueda:", eventosFiltradosPorBusqueda);

    return eventosFiltradosPorBusqueda;
}
function filtrarEventos(eventos) {
    console.log("Función filtrarPorCategoria ejecutada", eventos);
    console.log("Función filtrarEventos ejecutada", eventos);
    let eventosFiltrados = filtrarPorCategoria(eventos);
    eventosFiltrados = filtrarPorBusqueda(eventosFiltrados);
    return eventosFiltrados;
}
function mostrarEventos(eventos) {
    container.innerHTML = "";
    if (eventos.length === 0) {
        container.innerHTML = "<p>Not categories found</p>";
    } else {
        for (let card of eventos) {
            container.innerHTML += crearMaqueta(card);
        }
    }
}
