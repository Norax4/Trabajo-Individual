import { tareas } from "./array.js";
import { Tarea } from "./clases.js";

document.addEventListener('DOMContentLoaded', function(){
    let botonChecklist = document.getElementById("checklist");
    let parcelList = document.getElementById("parcel-list");
    let popup = document.getElementById("popup");
    let textInput = document.getElementById("textInput");
    let createBtn = document.getElementById("createBtn");
    let buttonX = document.querySelectorAll("btn");
    let popupDel = document.getElementById("deletePopup");
    let delButton = document.getElementById("deleteBtn");
    let cancelBtn = document.getElementById("cancelBtn");
    let sortBtn = document.getElementById("sort");

    function updateList() {
        parcelList.innerHTML = '';

        //Muy cansada para seguir, cambiar los enlaces a input para el bloque de "cumplido".
        tareas.forEach(item => {
            let li = document.createElement('li');
            let enlace = document.createElement('input');
            enlace.textContent = item.texto;
            enlace.type = 'button';
            enlace.href = '#';
            let button = document.createElement('button');
            button.id = ("btn, btn-danger");
            button.className = "btn";
            button.textContent = 'X';
            let div = document.createElement('div');
            div.innerHTML = `<p>${item.content}<p>`;
            li.appendChild(enlace);
            li.appendChild(button);
            parcelList.appendChild(li);
        });

    }

    //Popup para crear tarea
    botonChecklist.addEventListener('click', function() {
        popup.style.display = 'block';
    });

    //Crear tarea
    createBtn.addEventListener('click', function() {
        let text = textInput.value;
        if (text) {
            let tarea = new Tarea(text)
            tareas.push(tarea);
            updateList();
        }
        popup.style.display = 'none';
        textInput.value = '';
    });
});