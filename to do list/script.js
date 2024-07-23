// Ajouter un bouton "close" à chaque élément de la liste existant
var myNodeList = document.getElementsByTagName('LI');
for (var i = 0; i < myNodeList.length; i++) {
    var button = document.createElement('BUTTON');
    var txt = document.createTextNode('\u00D7');
    button.className = "close";
    button.appendChild(txt);
    myNodeList[i].appendChild(button);
}

// Ajouter un événement de clic pour les boutons "close" pour masquer l'élément de la liste
var close = document.getElementsByClassName("close");
for (var i = 0; i < close.length; i++) {
    close[i].onclick = function() {
        var div = this.parentElement;
        div.style.display = "none";
        removeTask(div.textContent.slice(0, -1));
    }
}

// Ajouter un événement de clic sur la liste pour marquer les éléments comme terminés
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
    if (ev.target.tagName === 'LI') {
        ev.target.classList.toggle('checked');
    }
}, false);

// Fonction pour ajouter un nouvel élément de liste
function newElement() {
    var li = document.createElement('li');
    var inputValue = document.getElementById('MyInput').value;
    var t = document.createTextNode(inputValue);
    li.appendChild(t);

    if (inputValue === "") {
        alert("Vous devez écrire quelque chose !");
    } else {
        document.getElementById('myUL').appendChild(li);
        var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(inputValue);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        document.getElementById('MyInput').value = "";
        addCloseButton(li);
    }
}

// Fonction pour ajouter un bouton "close" à un élément de liste
function addCloseButton(li) {
    var button = document.createElement("BUTTON");
    var txt = document.createTextNode("\u00D7");
    button.className = "close";
    button.appendChild(txt);
    li.appendChild(button);
    button.onclick = function() {
        var div = this.parentElement;
        div.style.display = "none";
        removeTask(div.textContent.slice(0, -1));
    }
}

// Fonction pour afficher les tâches
function displayTasks() {
    var taskList = document.getElementById("myUL");
    taskList.textContent = "";
    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(function(task) {
        var li = document.createElement('li');
        li.textContent = task;
        taskList.appendChild(li);
        addCloseButton(li);
    });
}

// Fonction pour retirer une tâche du localStorage
function removeTask(task) {
    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    var index = tasks.indexOf(task);
    if (index > -1) {
        tasks.splice(index, 1);
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

document.addEventListener('DOMContentLoaded', function() {
    displayTasks();
});
