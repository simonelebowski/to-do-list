'use strict';

const addTaskBtn = document.querySelector('.projects-btn-div');
const inputDiv = document.querySelector('.projects-input-div');
const cancelBtn = document.querySelector('.cancel-btn');
const addBtn = document.querySelector('.add-btn');

class Task {
    constructor(task, dueDate) {
        this.task = task;
        this.dueDate = dueDate;
    }
}

function addInputField() {
    addTaskBtn.classList.add('hidden');
    inputDiv.classList.remove('hidden');
}

function hideInputField() {
    addTaskBtn.classList.remove('hidden');
    inputDiv.classList.add('hidden');
}

function createTask() {
    const inputValue = document.querySelector('.input').value;
    const inputDate = document.querySelector('.input-date').value;
    const newTask = new Task(inputValue, inputDate);
    
    const tasksDiv = document.querySelector(".tasks-div");
    const newTaskElement = document.createElement("p");
    newTaskElement.innerText = `${newTask.task} - Due: ${newTask.dueDate}`;
  
    tasksDiv.appendChild(newTaskElement);

    hideInputField()
}


addTaskBtn.addEventListener('click', addInputField)
cancelBtn.addEventListener('click', hideInputField)
addBtn.addEventListener('click', createTask);