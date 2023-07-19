//referencias
const container1 = document.getElementById("tabla-frame")
const container2 = document.getElementById("tabla-frame2")
const container3 = document.getElementById("tabla-frame3")

//fetch
let events;
let currentDate;

fetch("https://mindhub-xj03.onrender.com/api/amazing")
    .then(res => res.json())
    .then(data => {
        events = data.events;
        currentDate = data.currentDate;
        mostrarTabla1(events);
        mostrarTabla2(events);
        mostrarTabla3(events);
    })
    .catch(error => console.log(error))

//funciones
function calcularEstadisticas(eventos) {
    let eventoConMayorAsistencia = eventos.slice().sort((a, b) => (b.assistance / b.capacity) - (a.assistance / a.capacity))[0];
    let eventoConMenorAsistencia = eventos.slice().sort((a, b) => (a.assistance / a.capacity) - (b.assistance / b.capacity))[0];
    let eventoConMayorCapacidad = eventos.slice().sort((a, b) => b.capacity - a.capacity)[0];
    
    return {
        eventoConMayorAsistencia,
        eventoConMenorAsistencia,
        eventoConMayorCapacidad
    };
}

function calcularEstadisticasPorCategoria(eventos) {
    let categorias = [...new Set(eventos.map(evento => evento.category))];
    
    let estadisticasPorCategoria = categorias.map(categoria => {
        let eventosDeCategoria = eventos.filter(evento => evento.category === categoria);
        let revenueTotal = eventosDeCategoria.reduce((total, evento) => total + evento.assistance * evento.price, 0);
        let asistenciaTotal = eventosDeCategoria.reduce((total, evento) => total + evento.assistance, 0);
        let capacidadTotal = eventosDeCategoria.reduce((total, evento) => total + evento.capacity, 0);
        let porcentajeAsistencia = capacidadTotal > 0 ? asistenciaTotal / capacidadTotal * 100 : 0;
        
        return {
            categoria,
            revenueTotal,
            porcentajeAsistencia
        };
    });
    
    return estadisticasPorCategoria;
}

function calcularEstimacionesPorCategoria(eventos) {
    let categorias = [...new Set(eventos.map(evento => evento.category))];
    
    let estimacionesPorCategoria = categorias.map(categoria => {
        let eventosDeCategoria = eventos.filter(evento => evento.category === categoria);
        let revenueEstimado = eventosDeCategoria.reduce((total, evento) => total + evento.estimate * evento.price, 0);
        let asistenciaEstimada = eventosDeCategoria.reduce((total, evento) => total + evento.estimate, 0);
        
        return {
            categoria,
            revenueEstimado,
            asistenciaEstimada
        };
    });
    
    return estimacionesPorCategoria;
}

function mostrarTabla1(eventos) {
    let eventosAntesDeFecha = eventos.filter(evento => evento.date < currentDate);
    
    let estadisticasAntesDeFecha = calcularEstadisticas(eventosAntesDeFecha);
    
    let tabla1 = `
        <table class="table">
            <thead>
                <tr>
                    <th>Events with highest % of assistance</th>
                    <th>Events with lowest % of assistance</th>
                    <th>Events with larger capacity</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>${estadisticasAntesDeFecha.eventoConMayorAsistencia.name} (${(estadisticasAntesDeFecha.eventoConMayorAsistencia.assistance / estadisticasAntesDeFecha.eventoConMayorAsistencia.capacity * 100).toFixed(2)}%)</td>
                    <td>${estadisticasAntesDeFecha.eventoConMenorAsistencia.name} (${(estadisticasAntesDeFecha.eventoConMenorAsistencia.assistance / estadisticasAntesDeFecha.eventoConMenorAsistencia.capacity * 100).toFixed(2)}%)</td>
                    <td>${estadisticasAntesDeFecha.eventoConMayorCapacidad.name} (${estadisticasAntesDeFecha.eventoConMayorCapacidad.capacity})</td>
                </tr>
            </tbody>
        </table>
    `;
    
    container1.innerHTML = tabla1;
}

function mostrarTabla2(eventos) {
    let eventosAntesDeFecha = eventos.filter(evento => evento.date < currentDate);
    
    let estadisticasPorCategoriaAntesDeFecha = calcularEstadisticasPorCategoria(eventosAntesDeFecha);
    
    let tabla2 = `
        <table class="table">
            <thead>
                <tr>
                    <th>Category</th>
                    <th>Total revenue</th>
                    <th>% of assistance</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    for (let estadistica of estadisticasPorCategoriaAntesDeFecha) {
        tabla2 += `
            <tr>
                <td>${estadistica.categoria}</td>
                <td>$${estadistica.revenueTotal.toFixed(2)}</td>
                <td>${estadistica.porcentajeAsistencia.toFixed(2)}%</td>
            </tr>
        `;
    }
    
    tabla2 += `
            </tbody>
        </table>
    `;
    
    container2.innerHTML = tabla2;
}

function mostrarTabla3(eventos) {
    let eventosDespuesDeFecha = eventos.filter(evento => evento.date > currentDate);
    
    let estimacionesPorCategoriaDespuesDeFecha = calcularEstimacionesPorCategoria(eventosDespuesDeFecha);
    
    let tabla3 = `
        <table class="table">
            <thead>
                <tr>
                    <th>Category</th>
                    <th>Estimated revenue</th>
                    <th>Estimated assistance</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    for (let estimacion of estimacionesPorCategoriaDespuesDeFecha) {
        tabla3 += `
            <tr>
                <td>${estimacion.categoria}</td>
                <td>$${estimacion.revenueEstimado.toFixed(2)}</td>
                <td>${estimacion.asistenciaEstimada}</td>
            </tr>
        `;
    }
    
    tabla3 += `
            </tbody>
        </table>
    `;
    
    container3.innerHTML = tabla3;
}

let container = document.getElementById("containerCards")
console.log(container)
let arrayEvents = data.events

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

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { show, mostrarListaCheckbox, filtroCheck, filtroPorSearch, filtrosCruzados}from "../Modules/function.js"
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let lugarDelaTarjeta = document.getElementById("sectionTarjetUp")
let checkBoxUp = document.getElementById("listaDeCheckboxTerminadaUp")
let buscadorUp = document.getElementById("buscadorUp")

let eventosApi

fetch("https://mindhub-xj03.onrender.com/api/amazing")//devuelve una promesa
.then (respuesta => respuesta.json())//si la respuesta es afirmativa, con el metodo json vuelvo esa respuesta  en un objeto mas facil de usar
.then (informacion => { eventosApi = informacion.events
    console.log(informacion)

let fechaApi = informacion.currentDate
let eventosFuturos = eventosApi.filter(evento => evento.date>=fechaApi)

show(eventosFuturos, lugarDelaTarjeta)

let listaCategoria = eventosFuturos.map(categoria => categoria.category)
let listasinRepetir = new Set (listaCategoria)
let transformacionDelaLista = Array.from(listasinRepetir)

mostrarListaCheckbox(transformacionDelaLista, checkBoxUp)
let check = document.querySelectorAll("input[type='checkbox']")

checkBoxUp.addEventListener("change",() => {
    lugarDelaTarjeta.innerHTML = " "
let categoriaSeleccionada = []
let checkSeleccionado = document.querySelectorAll("input[type='checkbox']:checked")
checkSeleccionado.forEach(categoria => categoriaSeleccionada.push (categoria.value))
let filtroCruzado = filtrosCruzados (eventosApi,categoriaSeleccionada, buscadorUp.value)
show(filtroCruzado, lugarDelaTarjeta)
})
})

buscadorUp.addEventListener('keyup', () => {
    lugarDelaTarjeta.innerHTML = " "
    let categoriaSeleccionada = []
    let checkSeleccionado = document.querySelectorAll("input[type='checkbox']:checked")
    checkSeleccionado.forEach(categoria => categoriaSeleccionada.push (categoria.value))
    let filtroCruzado = filtrosCruzados (eventosApi,categoriaSeleccionada, buscadorUp.value)
    show(filtroCruzado, lugarDelaTarjeta)
})



