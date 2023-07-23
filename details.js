//referencias
const parametro = location.search
console.log(parametro)

let url = new URLSearchParams(parametro);
console.log(url)

let idUrl = url.get('parametro');
console.log(idUrl)
console.log('Valor del parámetro:', idUrl);

let carta = document.getElementById("detailsCard")

// fetch
fetch("https://mindhub-xj03.onrender.com/api/amazing")
  .then(convertidor => convertidor.json())
  .then(data => {
    console.log('Datos recibidos de la API:', data);

    if (data && data.events) {
      const eventsID = data.events.map(event => event._id);
      console.log('eventsID:', eventsID);

      const matchingID = eventsID.find(id => id == idUrl);
      console.log('matchingID:', matchingID);

      const matchingEvent = data.events.find(event => event._id === matchingID);
      console.log('matchingEvent:', matchingEvent);
      console.log('Nombre del evento:', matchingEvent.name);

      // Llama a la función crearCartaDeDetalles aquí
      const cartaArmada = document.querySelector('#detailsCard');
      crearCartaDeDetalles(cartaArmada, matchingEvent);
    } else {
      console.log('Error: data or data.events is undefined');
    }
  })
  .catch(error => {
    console.error(error);
  });

// funciones
function crearCartaDeDetalles (cartaArmada, objetoId){
    console.log('Función crearCartaDeDetalles ejecutada');
    cartaArmada.innerHTML += 
    `
    <div class="container">
  <div class="row justify-content-center">
    <div class="col-12">
      <div class="bg-white rounded p-3">
        <img src="${objetoId.image}" class="img-fluid rounded-start w-100" alt="">
      </div>
    </div>
  </div>
  <div class="row justify-content-center">
    <div class="col-12">
      <div class="bg-white rounded p-3">
      <div class="card-body text-black">
      <h1 class="card-title">${objetoId.name}</h1>
      <p class="card-text" style="font-size: large;">${objetoId.description}</p>
      <div class="card-body text-black" style="text-align: center;">
        <ul style="font-size: large; text-align: left;">
          <li><small class="text-body-secondary">Date: ${objetoId.date}</small></li>
          <li><small class="text-body-secondary">Place: ${objetoId.place}</small></li>
          <li><small class="text-body-secondary">Capacity: ${objetoId.capacity}</small></li>
          <li><small class="text-body-secondary">Assistance: ${objetoId.assistance}</small></li>
          <li><small class="text-body-secondary">Price: ${objetoId.price}</small></li>
        </ul>
      </div>
    </div>
  </div>
</div>
</div>
  `;
}
