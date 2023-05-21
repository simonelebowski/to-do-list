'use strict';

import { Task } from "./utils/classes.js";
import { addInputField, hideInputField, addProjectInputField, hideProjectInputField, createTask, 
    createProject, selectedProjectId, showAllTasks, hideEdit, highlightSelectedMenu, showTodayTasks, showWeekTasks, hideNavResize,
    hideNav } from "./utils/ui.js";

const allTasksBtn = document.querySelector('.all-tasks');
const todayBtn = document.querySelector('.today-btn');
const weekBtn = document.querySelector('.week-btn');
const addTaskBtn = document.querySelector('.projects-btn-div');
const inputDiv = document.querySelector('.projects-input-div');
const cancelBtn = document.querySelector('.cancel-task');
const addBtn = document.querySelector('.add-task');
export const addProjectField = document.querySelector('.add-project-field');
const addProject = document.querySelector('.add-project');
const cancelProject = document.querySelector('.cancel-project');
const icon = document.querySelector('.icon');

export let allTasks = [];
export let projects = [];

icon.addEventListener('click', hideNav);

allTasksBtn.addEventListener('click', () => {
    showAllTasks(allTasks);
    highlightSelectedMenu(allTasksBtn);
})
todayBtn.addEventListener('click', () => {
    showTodayTasks();
    highlightSelectedMenu(todayBtn);
});
weekBtn.addEventListener('click', () => {
    showWeekTasks();
    highlightSelectedMenu(weekBtn);
})

addTaskBtn.addEventListener('click', addInputField);
cancelBtn.addEventListener('click', hideInputField);

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

window.addEventListener('resize', () => {
    hideNavResize();
});


