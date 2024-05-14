import { Auto } from "./auto.js";
import { leer, escribir, limpiar, jsonToObject, objectToJson } from "./local-storage.js";

const KEY_STORAGE = "autos";
const items = []; // array vacio
const formulario = document.getElementById("form-item");

document.addEventListener("DOMContentLoaded", onInit); // importante no poner parentesis, es un callback

function onInit() {
  mostrarForm();
  esconderForm();

  loadItems();
  rellenarTabla();

  escuchandoFormulario();
  escuchandoBtnDeleteAll();
}

function loadItems() {
    let str = leer(KEY_STORAGE);
    const objetos = jsonToObject(str) || [];

    objetos.forEach(obj => {
        const model = new Auto(
            obj.id,
            obj.titulo,
            obj.transaccion,
            obj.descripcion,
            obj.precio
        );
    
        items.push(model);
    });
}

/**
 * Quiero que obtenga el elemento del DOM table
 * luego quiero agregarle las filas que sean necesarias
 * se agregaran dependiendo de la cantidad de items que poseo
 */
function rellenarTabla() {
    const tabla = document.getElementById("table-items");
    let tbody = tabla.getElementsByTagName('tbody')[0];
  
    tbody.innerHTML = ''; // Me aseguro que esté vacio, hago referencia al agregar otro

    const celdas = ["id", "titulo", "transaccion", "descripcion", "precio", "puertas", "kms", "potencia"];
    // const celdas = ["id", "titulo", "precio"];

    items.forEach((item) => {
        let nuevaFila = document.createElement("tr");

        celdas.forEach((celda) => {
            let nuevaCelda = document.createElement("td");
            nuevaCelda.textContent = item[celda];

            nuevaFila.appendChild(nuevaCelda);
        });

        // Agregar la fila al tbody
        tbody.appendChild(nuevaFila);
    });
  }

function escuchandoFormulario() {
  formulario.addEventListener("submit", (e) => {
    // Luego del primer parcial, comenzaremos a enviar los datos a un externo
    // evito el comportamiento que realiza por defecto
    e.preventDefault();

    var fechaActual = new Date();
    var idRandom = Math.floor(Math.random() * 10) + 1;
    const model = new Auto(
      // fechaActual.getTime(),
      // idRandom,
      formulario.querySelector("#titulo").value,
      formulario.querySelector("#precio").value
    );

    const respuesta = model.verify();

    if (respuesta.success) {
      items.push(model);
      const str = objectToJson(items);
      escribir(KEY_STORAGE, str);

      actualizarFormulario();
      rellenarTabla();
    }
    else {
        alert(respuesta.rta);
    }
  });
}

function actualizarFormulario() {
  formulario.reset();
}

function escuchandoBtnDeleteAll() {
  const btn = document.getElementById("btn-delete-all");

  btn.addEventListener("click", (e) => {

    const rta = confirm('Desea eliminar todos los Items?');

    if(rta) {
      items.splice(0, items.length);

      limpiar(KEY_STORAGE);
      rellenarTabla();
    }
  });
}

function mostrarForm() {
  document.getElementById('btn-registro').addEventListener('click', function() {
    var formulario = document.getElementById('form-item');
    var formulario2 = document.getElementById('table-items');
    formulario.style.display = 'flex';
    formulario2.style.display = 'flex';
    formulario.classList.add('visible');
    formulario2.classList.add('visible');
  });
}

function esconderForm() {
  document.getElementById('btn-esconder').addEventListener('click', function() {
    var formulario = document.getElementById('form-item');
    var formulario2 = document.getElementById('table-items');
    formulario.style.display = 'none';
    formulario2.style.display = 'none';
  });
}