// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-btn");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");
// const todoContainer = document.querySelector(".todo-container");

let formWrapper = document.querySelector(".form-wrapper");
let formWidth = formWrapper.offsetWidth;

// ngasih min-width buat ul dari size widthnya form
todoList.style.minWidth = formWidth + "px";

// Event listener
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteAndCheck);
filterOption.addEventListener("click", filterTodo);

// Function
function addTodo(event) {
    // BIKIN DIV BARU YANG DI DALEMNYA ADA LI DAN BUTTON

    // prevent form from submitting(refresh the web)
    event.preventDefault();
    // create todo div inside the UL tag
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // create the LI tag inside todo div
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    // masukin todo-item ke todo div
    todoDiv.appendChild(newTodo);
    // add to local storage
    saveLocalTodos(todoInput.value);

    // check mark button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = "<i class='fas fa-check'></i>";
    completedButton.classList.add("complete-btn");
    // masukin completed btn ke todo div
    todoDiv.appendChild(completedButton);

    // trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = "<i class='fas fa-trash'></i>";
    trashButton.classList.add("trash-btn");
    // masukin trash btn ke todo div
    todoDiv.appendChild(trashButton);

    // APPEND TODO DIV KE TODO LIST
    todoList.appendChild(todoDiv);

    // CLEAR TODO INPUT VALUE
    todoInput.value = "";
}

function deleteAndCheck(event) {
    const item = event.target;

    // DELETE THE ITEM
    if (item.classList[0] === "trash-btn") {
        const thisTodo = item.parentElement;
        thisTodo.classList.add("falling");

        removeLocalTodos(thisTodo);

        thisTodo.addEventListener("transitionend", () => {
            thisTodo.remove();
        });

    }

    // CHECK MARK
    if (item.classList[0] === "complete-btn") {
        const thisTodo = item.parentElement;
        const thisTodoColor = item.previousElementSibling;
        thisTodo.classList.toggle("completed");
        thisTodoColor.classList.toggle("completedColor");
    }
}

function filterTodo(e) {
    const allTodosItem = todoList.childNodes;
    allTodosItem.forEach(todo => {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}

function saveLocalTodos(todo) {
    // CHECKING THE STORAGE - udah ada apa belom todonya di storage
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
    // CHECKING THE STORAGE - udah ada apa belom todonya di storage
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach(todo => {
        // create todo div inside the UL tag
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        // create the LI tag inside todo div
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        // masukin todo-item ke todo div
        todoDiv.appendChild(newTodo);

        // check mark button
        const completedButton = document.createElement("button");
        completedButton.innerHTML = "<i class='fas fa-check'></i>";
        completedButton.classList.add("complete-btn");
        // masukin completed btn ke todo div
        todoDiv.appendChild(completedButton);

        // trash button
        const trashButton = document.createElement("button");
        trashButton.innerHTML = "<i class='fas fa-trash'></i>";
        trashButton.classList.add("trash-btn");
        // masukin trash btn ke todo div
        todoDiv.appendChild(trashButton);

        // APPEND TODO DIV KE TODO LIST
        todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo) {
    // CHECKING THE STORAGE - udah ada apa belom todonya di storage
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);

    localStorage.setItem("todos", JSON.stringify(todos));
}