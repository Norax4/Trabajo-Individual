import { listas } from './array.js';
import { Lista, Elemento } from './clases.js';

let botonChecklist = document.getElementById("checklist");
let popup = document.getElementById("popup");
let createBtn = document.getElementById("createBtn");
let cancelBtn = document.getElementById('cancelBtn');


    function cargarListas(array){
        const parcelList = document.getElementById("parcel-list");
        parcelList.innerHTML = '';
        for (const item of array){
            const div = document.createElement('div');
            div.innerHTML += listaHTML(item);
            parcelList.appendChild(div);
        }
        eliminarLista();
    }

    function listaHTML(item){
        return `<a href="#" id="${item.id}" type="button" class="list-group-item list-group-item-action py-3 lh-sm">
                    <div class="d-flex w-100 align-items-center justify-content-between">
                        <strong class="mb-1">${item.info.titulo}</strong>
                    </div>
                    <div class="col-10 mb-1 small">${item.info.subtitulo}</div>
                    <button class="eliminarBtn">x</button>
                </a>`;
    }

    //Popup para crear lista
    botonChecklist.addEventListener('click', function() {
        popup.style.display = 'block';
    });

    cancelBtn.addEventListener('click', function(){
        popup.style.display = 'none';
    })

    //Crear lista
    createBtn.addEventListener('click', function() {
        const title = document.getElementById("textInput").value;
        const subtitle = document.getElementById("subtextInput").value;
        const id = nuevoId();
        const nuevaLista = new Lista(title, subtitle, id);
        let listass = JSON.parse(localStorage.getItem('listas' || '[]'));
        listass.push(nuevaLista);
        localStorage.setItem('listas', JSON.stringify(listass));
        popup.style.display = 'none';
        textInput.value = '';
        actualizarListas();
    });

    //Id para la lista
    function nuevoId(){
        let listas = JSON.parse(localStorage.getItem('listas' || '[]'));
        let ids = listas.map((lista) => lista.id);
        return Math.max(...ids) + 1;
    };

    function eliminarLista() {
        let deleteBtns = document.querySelectorAll('eliminarBtn');
        let listass = JSON.parse(localStorage.getItem('listas' || '[]'));
        deleteBtns.forEach((boton) => {
              boton.addEventListener("click", (e) => {
                let index = listass.findIndex((lista) => lista.id === (e.target.id));
                listass.splice(index, 1);
                localStorage.setItem('listas', JSON.stringify(listass));
                actualizarListas();
                alert("Producto eliminado correctamente");
                });
            });
    };

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