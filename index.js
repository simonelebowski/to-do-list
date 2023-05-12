'use strict';

import { Task } from "./js/classes.js";
import { addInputField, hideInputField, addProjectInputField, hideProjectInputField, createTask, createProject } from "./js/ui.js";
 
const addTaskBtn = document.querySelector('.projects-btn-div');
const inputDiv = document.querySelector('.projects-input-div');
const cancelBtn = document.querySelector('.cancel-task');
const addBtn = document.querySelector('.add-task');
const addProjectField = document.querySelector('.add-project-field');
const addProject = document.querySelector('.add-project');
const cancelProject = document.querySelector('.cancel-project');

let projects = [];

addTaskBtn.addEventListener('click', addInputField)
cancelBtn.addEventListener('click', hideInputField)
addBtn.addEventListener('click', createTask);
addProjectField.addEventListener('click', addProjectInputField);
cancelProject.addEventListener('click', hideProjectInputField);
addProject.addEventListener('click', () => {
    createProject(projects);
})