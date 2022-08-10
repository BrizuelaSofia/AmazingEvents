let arrayDataPrincipal;


getData();
async function getData() {
  await fetch("https://amazing-events.herokuapp.com/api/events")
    .then((response) => response.json()) //response es respuesta.
    .then((data) => (arrayDataPrincipal = data));
  console.log(arrayDataPrincipal);

  let dataBase = arrayDataPrincipal.events;
  console.log(dataBase);
  let fechaActual = arrayDataPrincipal.currentDate;
  console.log(fechaActual);

  let asistenciaEventos = [];
  console.log(asistenciaEventos);
  let arrayPast = dataBase.filter((e) => fechaActual > e.date);
  let arrayFuturos = dataBase.filter((e) => fechaActual < e.date);
  //primer tabla
  let porcentajes = [];
  arrayPast.map((eventos) => {
    porcentajes.push({
      eventos: eventos.name,
      porAsistencia: ((eventos.assistance * 100) / eventos.capacity).toFixed(2),
    });
  });
  let max = porcentajes.sort((a, b) => b.porAsistencia - a.porAsistencia)[0];
  console.log(max); //porcentaje maximo.
  let min = porcentajes.sort((a, b) => a.porAsistencia - b.porAsistencia)[0];
  console.log(min); //porcentaje minimo
  let capacity = dataBase
    .filter((e) => e.capacity)
    .sort((a, b) => b.capacity - a.capacity)[0];
  console.log(capacity);

  ///////////////array futuro////////////////
  let categoriasFuturasAsistencia = arrayFuturos.map(
    (eventos) => eventos.category
  );
  let categorySetFuture = new Set(categoriasFuturasAsistencia);
  let categorysFuturo = [...categorySetFuture];
  console.log(categorysFuturo);
  //me trae solo las categorias
  let categoryValueFuture = []; //creamos un array q contiene 1 objeto 2 propiedades
  categorysFuturo.map((category) =>
    categoryValueFuture.push({
      category: category,
      evento: arrayFuturos.filter((evento) => evento.category === category), //agrupamos los datos por categorias. y creamos un objeto mapeandolo
    })
  );
  console.log(categoryValueFuture);

  let estimadoYcapacidadFuturo = []; // De la varible anterior mapeamos en un nuevo array,
  categoryValueFuture.map((datos) => {
    estimadoYcapacidadFuturo.push({
      category: datos.category,
      estimate: datos.evento.map((item) => item.estimate),
      capacity: datos.evento.map((item) => item.capacity),
      estimateRevenue: datos.evento.map((item) => item.estimate * item.price),
    });
  });
  console.log(estimadoYcapacidadFuturo);

  estimadoYcapacidadFuturo.forEach((category) => {
    let totalEstimado = 0;
    category.estimate.forEach(
      (estimate) => (totalEstimado += Number(estimate))
    ); //suma de assistencia
    category.estimate = totalEstimado;

    let capacidadTotalFut = 0;
    category.capacity.forEach(
      (capacity) => (capacidadTotalFut += Number(capacity))
    ); //suma de capacity
    category.capacity = capacidadTotalFut;

    let totalEstimateRevenue = 0;
    category.estimateRevenue.forEach(
      (estimateRevenue) => (totalEstimateRevenue += Number(estimateRevenue))
    ); //suma de revenue
    category.estimateRevenue = totalEstimateRevenue;

    category.porcentajeAttendace = (
      (totalEstimado * 100) /
      capacidadTotalFut
    ).toFixed(2); //le agregamos una nueva propiedad, el calculo de % assistencia total por categoria.
  });
  console.log(estimadoYcapacidadFuturo);
  //array pasado
  let asistenciaPorCategoria = arrayPast.map((eventos) => eventos.category); //Extrajimos las categorias del array del evento pasado
  let categorySet = new Set(asistenciaPorCategoria); //eliminamos las categorias repetidas
  let categorys = [...categorySet]; //ahora en categorys hay un array de 7 categorias
  console.log(categorys); //me trae solo las categorias

  let categoryValue = []; //creamos un array q contiene 1 objeto 2 propiedades
  categorys.map((category) =>
    categoryValue.push({
      category: category,
      evento: arrayPast.filter((evento) => evento.category === category), //agrupamos los datos por categorias. y creamos un objeto mapeandolo
    })
  );
  console.log(categoryValue); //dividimos los eventos pasados por categoria. en una categoria hay varios eventos
  let asistenciaYcapacidadPasado = []; //de la variable anterior mapeamos en un nuevo array, de cada evento la asistencia la capacidad y calculamos el revenue
  categoryValue.map((datos) => {
    asistenciaYcapacidadPasado.push({
      category: datos.category,
      assistance: datos.evento.map((item) => item.assistance),
      capacity: datos.evento.map((item) => item.capacity),
      revenue: datos.evento.map((item) => item.assistance * item.price),
    });
  });
  console.log(asistenciaYcapacidadPasado); //ahora sumamos todos los elementos de cada propiedad entre si()

  asistenciaYcapacidadPasado.forEach((category) => {
    let totalAsistencia = 0;
    category.assistance.forEach(
      (assistance) => (totalAsistencia += Number(assistance))
    ); //suma de asistencia
    category.assistance = totalAsistencia; //cambia el valor de la propiedad del objeto.

    let totalCapacidad = 0;
    category.capacity.forEach(
      (capacity) => (totalCapacidad += Number(capacity))
    ); //suma de capacidad
    category.capacity = totalCapacidad;

    let totalRevenue = 0;
    category.revenue.forEach((revenue) => (totalRevenue += Number(revenue))); //suma de revenue
    category.revenue = totalRevenue;

    category.porcentaje = ((totalAsistencia * 100) / totalCapacidad).toFixed(2); //calculo de porcentaje de asistencia
  });
     /////////IMPRESION TABLA ESTADISTICA//////////
  function crearTablas() {
    let tabla1 = `    
       <tr> 
         <td>${max.eventos}:${max.porAsistencia}</td>
         <td>${min.eventos}: ${min.porAsistencia}%</td>
         <td>${capacity.name}: ${capacity.capacity}</td>
       </tr>
      `;
    document.querySelector(".tablaEstadistica").innerHTML = tabla1;
  }
  crearTablas();
       //////////impresion tabla upcoming//////////
  function creartTablaUpc() {
    let tabla2 = 
      ` 
        <tr class="text-start">
          <td >Categories</td>
          <td class="tdajuste">Estimated</td>
          <td lass="tdajuste">Percentage of estimated attendance</td>
        </tr>
      `;
     estimadoYcapacidadFuturo.forEach((e) => {
        e.estimadoYcapacidadFuturo;
        tabla2 += 
        `
          <tr class="text-start">
            <td class="tdajuste">${e.category}</td>
            <td class="tdajuste">$${e.estimateRevenue}</td>
            <td class="tdajuste">${e.porcentajeAttendace}%</td>
          </tr>
        `;
    });
    document.querySelector(".tablaFuturos").innerHTML = tabla2;
  }
  creartTablaUpc();
    //////////IMPRESION TABLA 3//////////
  function crearTablaPast() {
    let tabla3 = 
      `
        <tr class="text-start">
          <td class="tdajuste">Categories</td>
          <td class="tdajuste">Revenue</td>
          <td class="tdajuste">Percentage of attendance</td>
        </tr>
      `;
      asistenciaYcapacidadPasado.forEach((e) => {
        e.asistenciaYcapacidadPasado;
        tabla3 += 
        `
          <tr class="text-start">
            <td> ${e.category}</td>
            <td class="tdajuste" >$${e.revenue}</td>
            <td class="tdajuste">${e.porcentaje}%</td>
          </tr>
        `;
      });
    document.querySelector(".tablaPasados").innerHTML = tabla3;
  }
  crearTablaPast();
}
