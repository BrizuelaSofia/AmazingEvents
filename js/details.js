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
               <img src=${evento.image} style="width:25rem" class="img-fluid rounded-start imagecard-detail" alt="${evento.name}">
            </div>
            <div class=" col-12 col-md-6 d-flex justify-content-center align-items-center">
               <div class="card-body-detail">
                  <h5 class="card-title text-center">${evento.name}</h5>
                  <p class="card-text-detail">Date: ${evento.date}</p>
                  <p class="card-text-detail">Description: ${evento.description}</p>
                  <p class="card-text-detail">Category:${evento.category}</p>
                  <p class="card-text-detail">Place: ${evento.place}</p>
                  <p class="card-text-detail">Capacity: ${evento.capacity}</p>
                  <p class="card-text-detail">Price: $${evento.price}</p>
                  
               </div>
            </div>
         </div> 

`

  document.getElementById("carddetail").innerHTML = templateDetail;
}


