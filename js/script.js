/*
  2. Crea una función en la que reciba como parámetro el identificador de la etiqueta html

  Utiliza el identificador para:
    - Referenciar a la etiqueta en el index.html
    - Agrega el callback para que reaccionar al evento: pasar el mouse por encima
    - Arma el URL y realiza una petición asincrónica 
      
      'https://dataserverdaw.herokuapp.com/cotizaciones/'+identificador+'/json'

    - Procesa los elementos del arreglo en el JSON

    - Utilice la plantilla:
      `<tr>
        <td>"fecha"</td>
        <td>"numero"</td>
        <td class="clase">"variacion"</td>
      </tr>`

      - Cambie el texto de fecha, numero y variacion con los valores del arreglo de cotizaciones
  
      - El valor de clase depende del valor de variacion. Si es mayor que cero, tendrá el text 'up'. Caso contrario, tendrá el texto 'down'.
  
      - Agregue la plantilla al elemento 'values' dentro del index.html

 */



function responderEvento(identificador) {

  var URL = 'https://dataserverdaw.herokuapp.com/cotizaciones/' + identificador + '/json';
  var values = document.getElementById("values");

  var plantilla = `<tr>
  <td>"fecha"</td>
  <td>"numero"</td>
  <td class="clase">"variacion"</td>
  </tr>`;

  var plantillaNueva = ``;

  document.getElementById(identificador).addEventListener("mouseover", () => {
    const nombres = fetch(URL)
      .then(response => response.json())
      .then(data => {
        for (var i = 0; i < data.cotizaciones.length; i++) {
          var plantillaProvicional = plantilla;
          plantillaProvicional = plantillaProvicional.replace('"fecha"', data.cotizaciones[i].fecha);
          plantillaProvicional = plantillaProvicional.replace('"numero"', data.cotizaciones[i].numero);
          variacion = data.cotizaciones[i].variacion.replace(",", ".").replace("%", "");
          if (parseFloat(variacion) > 0) {
            plantillaProvicional = plantillaProvicional.replace('"variacion"', "up");
          } else {
            plantillaProvicional = plantillaProvicional.replace('"variacion"', "down");
          }

          plantillaNueva += plantillaProvicional;
        }
        values.innerHTML = plantillaNueva;
      });
  });
}

/*
  1. Para todos los elementos con la clase 'more'

  Envía el atributo id como parámetro para la función anterior.
 */

const eventos = document.querySelectorAll('span[class="more"]');

for (var i = 0; i < eventos.length; i++) {
  responderEvento(eventos[i].id);
}

