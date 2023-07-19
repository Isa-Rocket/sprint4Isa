///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*HOME*/
export function create(objet){
    return `
    <div class="d-flex justify-content-center">
    <div>
        <div class="card">
            <img src=${objet.image} class="card-img-top" alt="">
        <div class="card-body">
                <h5 class="card-title">${objet.name}</h5>
                <p class="card-text">${objet.description}</p>
                </div>
                <div class="card-footer">
                <p>Price:${objet.price}</p>
                <a href="./Assets/Page/details.html?parametro=${objet._id}" class="btn btn-danger">Details</a>
            </div>
            </div>
        </div>
    </div>
</div>
`}/* crea la carta*/

export function show(eventos, contenedor){
    if(eventos == 0){
        contenedor.innerHTML += "Non Found"
    }else{
    for(let evento of eventos){
        contenedor.innerHTML+=create(evento)
    }}
}/*muestra la carta*/ 

export function crearListaCheckbox(modulo){
    return` <div class="form-check">
    <input class="form-check-input" type="checkbox" value="${modulo}" id="${modulo}">
    <label class="form-check-label" for="${modulo}">${modulo}</label>
            </div> `
}

export function mostrarListaCheckbox(array, lugarEnLaPag){
    for(let elemento of array ){
        lugarEnLaPag.innerHTML += crearListaCheckbox(elemento)
    }
}

export function filtroCheck(array, categoria){
    if(categoria == 0){
        return array
    }
    return array.filter(evento => categoria.includes(evento.category) || categoria == 0)/*si el includes da true devuelve los eventos completos*/
}

export function filtroPorSearch(array, texto){
    return array.filter(evento => evento.name.toLowerCase().includes(texto.toLowerCase()))
}

export function filtrosCruzados(array, categoria, texto){
    let filtrocheckbox = filtroCheck(array, categoria)
    let filtroporsearch = filtroPorSearch(filtrocheckbox, texto)
    return filtroporsearch
}
