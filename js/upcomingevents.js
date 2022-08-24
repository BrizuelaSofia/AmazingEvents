//let fechaActual = data.fechaActual; la fecha actual obtenida desde la api pasa a ser currentDate
//console.log(fechaActual);
//let dataBase= data.eventos

getData();
async function getData() {
  await fetch("https://amazing-events.herokuapp.com/api/events")
    .then((response) => response.json())
    .then((data) => (arrayDataPrincipal = data));
  console.log(arrayDataPrincipal);

  let dataBase = arrayDataPrincipal.events;
  console.log(dataBase); //nos trae los eventos obtenido de la api.
  let fechaActual = arrayDataPrincipal.currentDate;

  function cardsActual(array) {
    let templateHtml = "";
    if (array.length !== 0) {
      array.forEach((data) => {
        if (data.date > fechaActual) {
          templateHtml += 
          `
           <div class= "col 4 d-flex justify-content-center">
             <div class="card" style="width:20rem; heigth:20rem ">
               <img src=${data.image}  style="width:auto" class=" image card-img-top imagecard" alt="tarjetas"></img>
               <div class="card-body">
                 <h5 class="card-title">${data.name}</h5>
                 <p class="card-text pb-3">${data.description}</p>
                 <p class="margin" >$ ${data.price} <a href="./details.html?id=${data._id}"" style="color:rgb(172, 15, 88)" class="btn-outline-dark btn marginn" >Detail</a></p>
                 <p>${data.date}</p>
               </div>
             </div>
            </div>
          `
        }
        document.querySelector(".contenedorCards").innerHTML = templateHtml;
      });
    } else {
      document.querySelector(
        ".contenedorCards"
      ).innerHTML = `<p style="color:white"> No events found =(</p>`;
    }
  }
  cardsActual(dataBase);

  var checkboxs = dataBase.map((evento) => evento.category);
  //console.log(checkboxs);
  var norepetidas = new Set(checkboxs); //se eliminan las repetidas.
  //console.log(norepetidas);
  var categorías = [...norepetidas].splice(1, 6);
  // (desestructuro el Set, las 7 categorías no repetidas.)
  categorías.splice(3, 1);
  //console.log(categorías);

  function imprimir() {
    var imprimirCheckboxs = "";
    categorías.forEach((categoria) => {
      //el parametro categoria se usa solo dentro de la función.
      //imprimo mi template en mi variable vacia
      imprimirCheckboxs += `<label class="checks">            
      <input class="form-check-input text-start" type="checkbox" 
      value=${categoria} id="flexCheckChecked">
      ${categoria}
      </label>`;
    });
    document.getElementById("checkboxupcoming").innerHTML = imprimirCheckboxs; //llamo al dom e imprimo mi template.
   
  }
  imprimir();
  var checkboxSelector = []; // el valor de lo q seleccionemos va a ir en el array
  var buscartext = "";

  var checkbox = document.querySelectorAll("input[type=checkbox]");
  //console.log(checkbox)
  checkbox.forEach((check) =>
    check.addEventListener("click", (event) => {
      var checked = event.target.checked;
      //el checked chequea si es true o false, devuelve el valor de lo q checkeaste.
      if (checked) {
        //devuelve el valor q despues filtra las tarjetas.
        checkboxSelector.push(event.target.value);
        //aca va una funcion las posibilidades de busqueda.
        //console.log(checkboxSelector)

        filtrador();
      } else {
        checkboxSelector = checkboxSelector.filter(
          (uncheck) => uncheck !== event.target.value
        );
        //aca va una funcion que filtra los no checkeados.
        filtrador();
      }
    })
  );
  var buscartext; //variable global porque los datos q yo introduzca a mi input search
  var buscador = document.getElementById("lupita");
  buscador.addEventListener("keyup", (event) => {
    buscartext = event.target.value;
    //acá va una funcion q va a filtrar texto.
    //console.log(buscartext)
    filtrador();
  });
  var buscartext; //variable global para los datos q yo introduzca a mi input search
  var buscador = document.getElementById("lupita");
  buscador.addEventListener("keyup", (event) => {
    buscartext = event.target.value;
    //acá va una funcion q va a filtrar texto.
    //console.log(buscartext)
    filtrador();
  });

  function filtrador() {
    let datos = [];
    if (checkboxSelector.length > 0 && buscartext !== "") {
      checkboxSelector.map((selected) => {
        datos.push(
          ...dataBase.filter(
            (evento) =>
              evento.name
                .toLocaleLowerCase()
                .includes(buscartext.trim().toLocaleLowerCase()) &&
              evento.category.includes(selected)
          )
        );
        //si mi parametro está incluido dentro de las categorias.
      });
    } else if (checkboxSelector.length > 0 && buscartext === "") {
      checkboxSelector.map((selected) => {
        datos.push(
          ...dataBase.filter((evento) => evento.category.includes(selected))
        );
      });
    } else if (checkboxSelector.length == 0 && buscartext !== "") {
      datos.push(
        ...dataBase.filter((evento) =>
          evento.name
            .toLocaleLowerCase()
            .includes(buscartext.trim().toLocaleLowerCase())
        )
      );
    } else {
      datos.push(...dataBase);
    }
    cardsActual(datos);
    //console.log(datos)
  }
  filtrador();
}
