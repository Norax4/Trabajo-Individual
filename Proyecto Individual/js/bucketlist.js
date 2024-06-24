import { listas } from './array.js';
import { Lista } from './clases.js';

let botonChecklist = document.getElementById("checklist");
let parcelList = document.getElementById("parcel-list");
let popup = document.getElementById("popup");
let textInput = document.getElementById("textInput");
let subtextInput = document.getElementById("subtextInput");
let createBtn = document.getElementById("createBtn");

    cargarListas(listas);

    function cargarListas(array){
        parcelList.innerHTML = "";
        for (const item of array){
            parcelList.innerHTML += listaHTML(item);
        }
    }

    function listaHTML(item){
        return `<a href="#" type="button" class="list-group-item list-group-item-action py-3 lh-sm">
                    <div class="d-flex w-100 align-items-center justify-content-between">
                        <strong class="mb-1">¡Bienvenido!</strong>
                    </div>
                    <div class="col-10 mb-1 small">${item.subtitulo}</div>
                    <button class="btn danger-btn" class="eliminarLista(${item.id}">x</button>
                </a>`;
    }

    //Popup para crear tarea
    botonChecklist.addEventListener('click', function() {
        popup.style.display = 'block';
    });

    //Crear tarea
    createBtn.addEventListener('click', function() {
        let title = textInput.value;
        let subtitle = subtextInput.value;
        if (text) {
            let newLista = new Lista(title, subtitle);
            listas.push(newLista);
        }
        popup.style.display = 'none';
        textInput.value = '';
    });

    function actualizarListas() {
        let listas = JSON.parse(localStorage.getItem('listas') || '[]');
        cargarListas(listas);
    }

    function inicializarLocalStorageListas() {
        if (!localStorage.getItem('listas')) {
            localStorage.setItem('listas', JSON.stringify(listas));  // Usa el array 'autos' importado
        }
    }

window.addEventListener('storage', function(event) {
    if (event.key === 'update') {
        actualizarListas();
    }
});

window.onload = function() {
    try {
        inicializarLocalStorageListas();
            actualizarListas();  // Mostrar autos existentes en LocalStorage
    } catch (error) {
        console.error('Error al cargar o actualizar los autos:', error);
    }
};