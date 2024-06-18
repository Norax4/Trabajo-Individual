/*import { parcelas } from "./array.js";*/
import {  parcelas } from "./array.js";
import { Parcela } from "./clases.js";

let botonChecklist = document.getElementById("checklist");
    let parcelList = document.getElementById("parcel-list");
    let popup = document.getElementById("popup");
    let textInput = document.getElementById("textInput");
    let createBtn = document.getElementById("createBtn");
    let buttonX = document.querySelectorAll("btn");
    let popupDel = document.getElementById("deletePopup");
    let delButton = document.getElementById("deleteBtn");
    let cancelBtn = document.getElementById("cancelBtn");
    let sortBtn = document.getElementById("sort")

document.addEventListener('DOMContentLoaded', function(){

    function updateList() {
        parcelList.innerHTML = '';

        parcelas.forEach(item => {
            let li = document.createElement('li');
            let enlace = document.createElement('a');
            enlace.textContent = item.title;
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

    botonChecklist.addEventListener('click', function() {
        popup.style.display = 'block';
    });

    createBtn.addEventListener('click', function() {
        let text = textInput.value;
        if (text) {
            let parcela = new Parcela(text)
            parcelas.push(parcela);
            updateList();
        }
        popup.style.display = 'none';
        textInput.value = '';
    });
});