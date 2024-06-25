import { listas } from './array.js';
import { Lista } from './clases.js';

let botonChecklist = document.getElementById("checklist");
let popup = document.getElementById("popup");
let createBtn = document.getElementById("createBtn");

    function cargarListas(array){
        const parcelList = document.getElementById("parcel-list");
        parcelList.innerHTML = '';
        for (const item of array){
            const div = document.createElement('div');
            div.innerHTML += listaHTML(item);
            parcelList.appendChild(div);
        }
    }

    function listaHTML(item){
        return `<a href="#" type="button" class="list-group-item list-group-item-action py-3 lh-sm">
                    <div class="d-flex w-100 align-items-center justify-content-between">
                        <strong class="mb-1">${item.info.titulo}</strong>
                    </div>
                    <div class="col-10 mb-1 small">${item.info.subtitulo}</div>
                    <button class="btn danger-btn" class="eliminarLista(${item.id}">x</button>
                </a>`;
    }

    //Popup para crear tarea
    botonChecklist.addEventListener('click', function() {
        popup.style.display = 'block';
    });

    //Crear tarea
    createBtn.addEventListener('click', function() {
        const title = document.getElementById("textInput").value;
        const subtitle = document.getElementById("subtextInput").value;
        const nuevaLista = new Lista(title, subtitle);
        let listas = JSON.parse(localStorage.getItem('listas' || '[]'));
        listas.push(nuevaLista);
        localStorage.setItem('listas', JSON.stringify(listas));
        popup.style.display = 'none';
        textInput.value = '';
        actualizarListas();
    });

    /*function eliminarLista(id) {
        let gameStorage = obtenerLocalStorage();
    
        let indice = gameStorage.findIndex(juego => juego.codigo === id);
    
        if (indice !== -1) {
          gameStorage.splice(indice, 1);
          guardarLocalStorage(gameStorage);
          cargarJuegos(gameStorage);
      
          alert("Producto eliminado correctamente");
        } else {
          alert("No se encontró el producto");
        }
        };*/

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

window.addEventListener('load', function(){
    try {
        inicializarLocalStorageListas();
        actualizarListas();
    } catch (error) {
        console.error('Se ha producido un error:', error);
    }
})