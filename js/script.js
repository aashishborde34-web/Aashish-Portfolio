document.addEventListener("DOMContentLoaded", function () {

    const themeButton = document.getElementById("theme-toggle");

    if (!themeButton) {
        return;
    }

    themeButton.addEventListener("click", function () {

        document.documentElement.classList.toggle("dark-mode");

        if (document.documentElement.classList.contains("dark-mode")) {
            themeButton.textContent = "☀️ Light Mode";
        } else {
            themeButton.textContent = "🌙 Dark Mode";
        }

    });

});

// ==============================
// To-Do List
// ==============================

const todoForm = document.getElementById("todo-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const filterButtons = document.querySelectorAll("[data-filter]");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


// Save Tasks
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


// Display Tasks
function displayTasks(filter = "all") {

    if (!taskList) {
        return;
    }

    taskList.innerHTML = "";

    let filteredTasks = tasks;

    if (filter === "active") {
        filteredTasks = tasks.filter(function (task) {
            return !task.completed;
        });
    }

    if (filter === "completed") {
        filteredTasks = tasks.filter(function (task) {
            return task.completed;
        });
    }

    filteredTasks.forEach(function (task) {

        const li = document.createElement("li");
        li.dataset.id = task.id;

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.className = "task-checkbox";

        const span = document.createElement("span");
        span.textContent = task.text;

        if (task.completed) {
            span.style.textDecoration = "line-through";
        }

        const editButton = document.createElement("button");
        editButton.type = "button";
        editButton.textContent = "Edit";
        editButton.className = "edit-task";

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-task";

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(editButton);
        li.appendChild(deleteButton);

        taskList.appendChild(li);
    });
}


// Add Task
todoForm?.addEventListener("submit", function (event) {

    event.preventDefault();

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        return;
    }

    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    tasks.push(task);

    saveTasks();

    taskInput.value = "";

    displayTasks();
});


// Edit & Delete
taskList?.addEventListener("click", function (event) {

    const li = event.target.closest("li");

    if (!li) {
        return;
    }

    const taskId = Number(li.dataset.id);

    const task = tasks.find(function (item) {
        return item.id === taskId;
    });

    if (!task) {
        return;
    }


    // Delete
    if (event.target.classList.contains("delete-task")) {

        tasks = tasks.filter(function (item) {
            return item.id !== taskId;
        });

        saveTasks();

        displayTasks();
    }


    // Edit
    if (event.target.classList.contains("edit-task")) {

        const newText = prompt("Edit task:", task.text);

        if (newText !== null && newText.trim() !== "") {

            task.text = newText.trim();

            saveTasks();

            displayTasks();
        }
    }

});


// Complete Task
taskList?.addEventListener("change", function (event) {

    if (!event.target.classList.contains("task-checkbox")) {
        return;
    }

    const li = event.target.closest("li");
    const taskId = Number(li.dataset.id);

    const task = tasks.find(function (item) {
        return item.id === taskId;
    });

    if (task) {

        task.completed = event.target.checked;

        saveTasks();

        displayTasks();
    }

});


// Filters
filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const filter = button.dataset.filter;

        displayTasks(filter);

    });

});


// Load saved tasks
if (taskList) {
    displayTasks();
}console.log("");
