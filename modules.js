///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*HOME*/
export function crearMaqueta(objeto) {
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

export function mostrarMaqueta(eventos) {
    container.innerHTML = "";
    for (let card of eventos) {
        container.innerHTML += crearMaqueta(card)
    }
}

export function crearCheckbox(categoria) {
    return `
    <label for = ${categoria}>${categoria}</label>
    <input type="checkBox" name=""
    id =${categoria} value = '${categoria}'></input>
    
    `
}

export function mostrarCheckbox(array, donde) {
    for (let elemento of array) {
        donde.innerHTML += crearCheckbox(elemento)
    }
}

export function filtrarPorBusqueda(eventosFiltrados) {
    let valorBusqueda = elSearch.value.toLowerCase();
    let eventosFiltradosPorBusqueda = eventosFiltrados.filter(function (evento) {
        let coincidenciaNombre = evento.name.toLowerCase().search(valorBusqueda) !== -1;
        let coincidenciaDescripcion = evento.description.toLowerCase().search(valorBusqueda) !== -1;
        return coincidenciaNombre || coincidenciaDescripcion;
    });

    return eventosFiltradosPorBusqueda;
}

export function filtrarPorCategoria(eventosFiltrados) {
    let checkedCheckboxes = Array.from(document.querySelectorAll("input[type='checkbox']:checked"))
    let checkedCategories = checkedCheckboxes.map(checkbox => checkbox.value)
    let filteredEvents = eventosFiltrados.filter(evento => checkedCategories.includes(evento.category))
    return filteredEvents;
}

export function filtrarEventos() {
    let eventosFiltradosPorCategoria = filtrarPorCategoria(eventos);
    let eventosFiltradosPorBusquedaYCategoria = filtrarPorBusqueda(eventosFiltradosPorCategoria);

    if (eventosFiltradosPorBusquedaYCategoria.length === 0) {
        container.innerHTML = "Categoría no encontrada";
    } else {
        mostrarMaqueta(eventosFiltradosPorBusquedaYCategoria);
    }
}
export function mostrarEventos(eventos) {
    resultados.innerHTML = "";
    for (let card of eventos) {
        container.innerHTML += crearMaqueta(card)
    };
}