let darrayEventosPasados;

getData();
async function getData() {
  await fetch("https://amazing-events.herokuapp.com/api/events")
    .then((response) => response.json())
    .then((data) => (arrayDataPrincipal = data));
  console.log(arrayDataPrincipal);

  let dataBase = arrayDataPrincipal.events;
  console.log(dataBase);
  let fechaActual = arrayDataPrincipal.currentDate;

  function cardsPasadas(array) {
    let templateHtml = "";
    if (array.length !== 0) {
      array.forEach((data) => {
        if (data.date < fechaActual) {
          templateHtml +=
            `
            <div class= "col 4 d-flex justify-content-center">
    <div class="container ">
        <div class="card ">
            <div class="face face1">
                <div class="content">
                    <div>
                    <h3 class="h3">
                        ${data.name}
                    </h3>
                    <img src=${data.image}  style="width:46vh" class=" image card-img-top imagecard" alt="tarjetas"></img>
                    </div>
                </div>
            </div>
            <div class="face face2">
                <div class="content">
                    
                    <p class="description">${data.description}</p>
                    <p class="margin" >$ ${data.price} <a href="./details.html?id=${data._id}"" style="color:rgb(172, 15, 88)" class="btn-outline-dark btn marginn" >Detail</a></p>
                    <p class="date">${data.date}</p>
                    </div>
            </div>
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
  cardsPasadas(dataBase);

  let checkboxs = dataBase.map((evento) => evento.category);
  //console.log(checkboxs);
  let norepetidas = new Set(checkboxs);
  //console.log(norepetidas);
  let categorías = [...norepetidas];

  function imprimir() {
    let imprimirCheckboxs = "";
    categorías.forEach((categoria) => {

      imprimirCheckboxs += `
      <label class="checks">             
  <input class="form-check-input text-start " type="checkbox" 
  value=${categoria} id="flexCheckChecked">
 ${categoria}
</label>`;
    });
    document.getElementById("misCheckboxes").innerHTML = imprimirCheckboxs; //llamo al dom e imprimo mi template.
  }
  imprimir();

  let checkboxSelector = [];
  let buscartext = "";
  let checkbox = document.querySelectorAll("input[type=checkbox]");
  //console.log(checkbox)

  checkbox.forEach((check) =>
    check.addEventListener("click", (event) => {
      let checked = event.target.checked;
      if (checked) {

        checkboxSelector.push(event.target.value);
        //console.log(checkboxSelector)
        filtrador();
      } else {
        checkboxSelector = checkboxSelector.filter(
          (uncheck) => uncheck !== event.target.value
        );
        filtrador();
      }
    })
  );

  let buscador = document.getElementById("lupita");
  buscador.addEventListener("keyup", (event) => {
    buscartext = event.target.value;
    // console.log(buscartext)
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
    cardsPasadas(datos);
    //console.log(datos)
  }
  filtrador();
}
