document.addEventListener("DOMContentLoaded", function() {
    let botonChecklist = document.getElementById("checklist");
    let parcelList = document.getElementById("parcel-list");
    let popup = document.getElementById("popup");
    let nameInput = document.getElementById("nameInput");
    let createBtn = document.getElementById("createBtn");
    let buttonX = document.querySelectorAll("btn");
    let popupDel = document.getElementById("deletePopup");
    let delButton = document.getElementById("deleteBtn");
    let cancelBtn = document.getElementById("cancelBtn");

    let parcelas = [];

    function updateList() {
        parcelList.innerHTML = '';

        parcelas.forEach(item => {
            let li = document.createElement('li');
            let enlace = document.createElement('a');
            enlace.textContent = item;
            enlace.type = 'button';
            enlace.href = '#';
            let button = document.createElement('button');
            button.id = ("btn, btn-danger");
            button.className = "btn";
            button.textContent = 'X';
            li.appendChild(enlace);
            li.appendChild(button);
            parcelList.appendChild(li);
        });

    }

    botonChecklist.addEventListener('click', function() {
        popup.style.display = 'block';
    });

    createBtn.addEventListener('click', function() {
        let name = nameInput.value;
        if (name) {
            parcelas.push(name);
            updateList();
        }
        popup.style.display = 'none';
        nameInput.value = '';
    });

    buttonX.addEventListener('click', function() {
        popupDel.style.display = 'block';
    });

    delButton.addEventListener('click', function() {
        let name = 
        parcelas.splice()
        popupDel.style.display = 'none';
    })

    cancelBtn.addEventListener('click', function() {
        popupDel.style.display = 'none';
    });
});