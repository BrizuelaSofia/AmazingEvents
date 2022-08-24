

let arrayDataPrincipal;


getData();
async function getData() {
  await fetch("https://amazing-events.herokuapp.com/api/events")
    .then((response) => response.json())
    .then((data) => (arrayDataPrincipal = data));
  console.log(arrayDataPrincipal);

  let dataBase = arrayDataPrincipal.events;
  console.log(dataBase); 

  //////////CARD//////////
  function datosCards(array) {

    let templateHtml = "";
    if (array.length !== 0) {
      array.forEach((data) => {
        templateHtml +=
          `
           <div class= "col 4 d-flex justify-content-center">
             <div class="card" style="width:20rem; heigth:20rem ">
               <img src=${data.image}  style="width:auto" class=" image card-img-top imagecard" alt="tarjetas"></img>
               <div class="card-body">
                 <h5 class="card-title">${data.name}</h5>
                 <p class="card-text pb-1">${data.description}</p>
                 <p class="margin" >$ ${data.price} <a href="./details.html?id=${data._id}"" style="color:rgb(172, 15, 88)" class="btn-outline-dark btn marginn" >Detail</a></p>
                 
               </div>
             </div>
            </div>
           `

        document.querySelector(".contenedorCards").innerHTML = templateHtml;
      });
    } else {
      document.querySelector(
        ".contenedorCards"
      ).innerHTML = `<p style="color:white"> No events found =(</p>`;
    }
  }
  datosCards(dataBase);

  //////////CREAR CHECKBOX.//////////

  // el parametro evento hace referencia a cada objet del array.
  let checkboxs = dataBase.map((evento) => evento.category);
  //console.log(checkboxs);
  let norepetidas = new Set(checkboxs); //se eliminan las repetidas. Metdo o constructor q me va a recorrer mi array y va a devolver el primer valor.
  //console.log(norepetidas);
  let categorías = [...norepetidas]; // (desestructuro el Set, y extraigo las 7 categorías no repetidas).
  //console.log(categorías);

  //////////IMPRIMIR CHECKBOX//////////

  function imprimir() {
    let imprimirCheckboxs = "";
    categorías.forEach((categoria) => {
      //imprimo mi template en mi variable vacia
      imprimirCheckboxs += `<label class="checks">  
       <input class="form-check-input text-start" type="checkbox" 
       value=${categoria} id="flexCheckChecked">
       ${categoria}
       </label>`;
    });
    document.getElementById("misCheckboxes").innerHTML = imprimirCheckboxs; //llamo al dom e imprimo mi template.


  }
  imprimir();

  //////////INICIO A CAPTURAR Y ESCUCHAR LOS EVENTOS DE LOS CHECKBOX//////////

  //variable global.
  let checkboxSelector = [];
  let buscartext = "";
  let checkbox = document.querySelectorAll("input[type=checkbox]");
  console.log(checkbox) |
    checkbox.forEach((check) =>
      check.addEventListener("click", (event) => {
        let checked = event.target.checked;
        //target:lugar donde se disparó el evento. objetivo del evento.

        if (checked) {

          checkboxSelector.push(event.target.value);

          filtrador();
        } else {
          checkboxSelector = checkboxSelector.filter(
            (uncheck) => uncheck !== event.target.value
          );

          filtrador();
        }
      })
    );

  //////////CAPTURA INPUT SEARCH.//////////

 
  let buscador = document.getElementById("lupita"); //input de tipo search.
  buscador.addEventListener("keyup", (event) => {
    buscartext = event.target.value;
    //console.log(buscartext);
    filtrador();
  });

  //////////FILTRADOR.//////////

  function filtrador() {
    let datos = [];
    if (checkboxSelector.length > 0 && buscartext !== "") {
      //combina todo
      checkboxSelector.map((selected) => {
        datos.push(
          ...dataBase.filter(
            (evento) =>
              evento.name.toLocaleLowerCase().includes(
                buscartext.trim().toLocaleLowerCase()
              ) && evento.category.includes(selected)
          )
        );

      });
    } else if (checkboxSelector.length > 0 && buscartext === "") {
      //seleccionar uno o más check
      checkboxSelector.map((selected) => {
        datos.push(
          ...dataBase.filter((evento) => evento.category.includes(selected))
        );
      });
    } else if (checkboxSelector.length == 0 && buscartext !== "") {
      //escribir en el input
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
    datosCards(datos);
    //console.log(datos)
  }
  filtrador();
}
