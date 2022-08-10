let arrayDataPrincipal;

//var dataFromApi;
getData();
async function getData() {
  await fetch("https://amazing-events.herokuapp.com/api/events")
    .then((response) => response.json())
    .then((data) => (arrayDataPrincipal = data));
  console.log(arrayDataPrincipal);

  let dataBase = arrayDataPrincipal.events;
  console.log(dataBase); 

  
  let id = location.search.split("?id=")[1];
  // console.log(location.search);
  let evento = dataBase.find((evento) => evento._id == id); //find:busca el primer elemento 

  templateDetail = `
  <div class="row g-4 ">
            <div class="col-12 col-md-6 d-flex justify-content-center">
               <img src=${evento.image} style="width:25rem" class="img-fluid rounded-start imagecard" alt="${evento.name}">
            </div>
            <div class=" col-12 col-md-6 d-flex justify-content-center align-items-center">
               <div class="card-body">
                  <h5 class="card-title text-center">${evento.name}</h5>
                  <p class="card-text">Date: ${evento.date}</p>
                  <p class="card-text">Description: ${evento.description}</p>
                  <p class="card-text">Category:${evento.category}</p>
                  <p class="card-text">Place: ${evento.place}</p>
                  <p class="card-text">Capacity: ${evento.capacity}</p>
                  <p class="card-text">Price: $${evento.price}</p>
                  
               </div>
            </div>
         </div> 

`

  document.getElementById("carddetail").innerHTML = templateDetail;
}


