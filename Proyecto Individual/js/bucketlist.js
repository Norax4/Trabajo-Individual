import { listas } from './array.js';
import { Lista, Tarea } from './clases.js';

let botonChecklist = document.getElementById("checklist");
let form = document.getElementById("listas-form");
let createBtn = document.getElementById("createBtn");
let cancelBtn = document.getElementById('cancelBtn');
let sortListas = document.getElementById('sort');


    function cargarListas(array){
        const parcelList = document.getElementById("parcel-list");
        parcelList.innerHTML = '';
        array.forEach((item, index) => {
            const div = document.createElement('div');
            div.innerHTML += listaHTML(item);

            const modifyButton = document.createElement('button');
            modifyButton.textContent = 'Modificar';
            modifyButton.className = 'modify-button';
            modifyButton.onclick = () => modificarLista(index);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'X';
            deleteButton.className = 'delete-button';
            deleteButton.onclick = () => eliminarLista(index);

            const addButton = document.createElement('button');
            addButton.textContent = '+';
            addButton.className = 'add-button';
            addButton.onclick = () => agregarTareas(index);

            div.appendChild(addButton);
            div.appendChild(deleteButton);
            div.appendChild(modifyButton);
            parcelList.appendChild(div);
        });
        listarTareas();
    }

    function listaHTML(item){
        return `<button id="${item.id}" class="btn-list list-group-item list-group-item-action py-3 lh-sm">
                    <div class="d-flex w-100 align-items-center justify-content-between">
                        <strong class="mb-1">${item.info.titulo}</strong>
                    </div>
                    <div class="col-10 mb-1 small">${item.info.subtitulo}</div>
                </button>`;
    }

    //Popup para crear lista
    botonChecklist.addEventListener('click', function() {
        form.style.display = 'block';
    });

    cancelBtn.addEventListener('click', function(){
        form.style.display = 'none';
    })

    //Crear lista
    form.addEventListener('submit', function(event){
        event.preventDefault();
        let listass = JSON.parse(localStorage.getItem('listas' || '[]'));

        //Obtener informacion de los input
        const title = document.getElementById("textInput").value;
        const subtitle = document.getElementById("subtextInput").value;
        const id = parseInt(this.dataset.idLista);

        const nuevaLista = new Lista(title, subtitle, id);
        
        if (this.dataset.idLista !== undefined){
            let indice = listass.findIndex((list) => list.id === nuevaLista.id);
            listass[indice] = nuevaLista;
        } else {
            nuevaLista.id = nuevoId();
            listass.push(nuevaLista);
        };
        localStorage.setItem('listas', JSON.stringify(listass));
        form.style.display = 'none';
        actualizarListas();
        //reset formulario
        this.reset();
        //eliminar id del formulario
        delete this.dataset.idLista;
    });

    //Id para la lista
    function nuevoId(){
        let listass = JSON.parse(localStorage.getItem('listas' || '[]'));
        let ids = listass.map((lista) => lista.id);
        return Math.max(...ids) + 1;
    };

    //Modificacion de listas
    function modificarLista(index){
        form.style.display = 'block';
        let listass = JSON.parse(localStorage.getItem('listas'));
        let lista = listass[index];

        if (lista){
            document.getElementById("textInput").value = lista.info.titulo;
            document.getElementById("subtextInput").value = lista.info.subtitulo
            form.dataset.idLista = lista.id;
        }
    }

    //Eliminar listas
    function eliminarLista(index) {
        let listass = JSON.parse(localStorage.getItem('listas'));
        listass.splice(index, 1);
        localStorage.setItem('listas', JSON.stringify(listass));
        actualizarListas();
    }

    //Agregar tareas a una lista
    let formTarea = document.getElementById('popup-listas');

    function agregarTareas(index){
        formTarea.style.display = 'block';
        let listass = JSON.parse(localStorage.getItem('listas'));
        let lista = listass[index];

        if (lista){
            formTarea.dataset.idLista = lista.id;
        }
    };

    formTarea.addEventListener('submit', function(event){
        event.preventDefault();
        let listass = JSON.parse(localStorage.getItem('listas' || '[]'));
        let lista = listass.find((list) => list.id === (this.dataset.idLista));

        //Obtener información del form
        let textoTarea = document.getElementById('tarea-texto').value.trim();
        lista.agregarTarea(textoTarea)
        listass.push(lista);

        localStorage.setItem('listas', JSON.stringify(listass));
        formTarea.style.display = 'none';
        actualizarListas();
        this.reset();
        delete this.dataset.idLista;
    });

    //Listar el contenido de cada lista
    function listarTareas(){
        let botones = document.querySelectorAll('.btn-list');
        let listass = JSON.parse(localStorage.getItem('listas'));
        if (botones !== null){
            for (const boton of botones){
                boton.addEventListener('click', function(e){
                    let lista = listass.find((list) => list.id === parseInt(e.target.id));
                    let contenidoDeLista = lista.listarTareas();
                    console.log(contenidoDeLista);
                })
            }
        }
        
    }

    //Actualizar las listas si hay cambios
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