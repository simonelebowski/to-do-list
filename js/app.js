import { addInputField, hideInputField, createTask } from "./ui.js";

const addTaskBtn = document.querySelector('.projects-btn-div');
const cancelBtn = document.querySelector('.cancel-btn');
const addBtn = document.querySelector('.add-btn');

addTaskBtn.addEventListener('click', addInputField);
cancelBtn.addEventListener('click', hideInputField);
addBtn.addEventListener('click', createTask);