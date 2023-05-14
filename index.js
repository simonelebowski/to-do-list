'use strict';

import { Task } from "./js/classes.js";
import { addInputField, hideInputField, addProjectInputField, hideProjectInputField, createTask, 
    createProject, selectedProjectId, showAllTasks, hideEdit } from "./js/ui.js";

const allTasksBtn = document.querySelector('.all-tasks');
const addTaskBtn = document.querySelector('.projects-btn-div');
const inputDiv = document.querySelector('.projects-input-div');
const cancelBtn = document.querySelector('.cancel-task');
const addBtn = document.querySelector('.add-task');
const addProjectField = document.querySelector('.add-project-field');
const addProject = document.querySelector('.add-project');
const cancelProject = document.querySelector('.cancel-project');

export let allTasks = [];
export let projects = [];


allTasksBtn.addEventListener('click', () => {
    showAllTasks(allTasks);
})
addTaskBtn.addEventListener('click', addInputField)
cancelBtn.addEventListener('click', hideInputField)
addBtn.addEventListener('click', () => {
    createTask(selectedProjectId);
});
addProjectField.addEventListener('click', addProjectInputField);
cancelProject.addEventListener('click', hideProjectInputField);
addProject.addEventListener('click', () => {
    createProject(projects);
})


document.addEventListener('click', (event) => {
    hideEdit(event);
})


