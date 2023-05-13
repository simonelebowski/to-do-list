import { Task, Project } from "./classes.js";
import { projects } from "../index.js"

const addTaskBtn = document.querySelector('.projects-btn-div');
const inputDiv = document.querySelector('.projects-input-div');
const projectInputField = document.querySelector('.input-project-div');
const tasksDiv = document.querySelector(".tasks-div");
const header = document.querySelector('.header-tasks');

// let selectedProject = null;
export let selectedProjectId = null;


// ----------ADD AND HIDE FUNCTIONS--------------------
function addInputField() {
    addTaskBtn.classList.add('hidden');
    inputDiv.classList.remove('hidden');
}

function hideInputField() {
    addTaskBtn.classList.remove('hidden');
    inputDiv.classList.add('hidden');
}

function addProjectInputField() {
    projectInputField.classList.remove('hidden');
};

function hideProjectInputField() {
    projectInputField.classList.add('hidden');
};
// ----------------------------------------------------


function findProjectById(projectId) {
    return projects.find(project => project.id === projectId);
}


function createTask(projectId = null) {
    const inputValue = document.querySelector('.input').value;
    const inputDate = document.querySelector('.input-date').value;
    const newTask = new Task(inputValue, inputDate);

    const taskDiv = document.createElement('div');
    taskDiv.classList.add('flex', 'center', 'space', 'task-div');
    const newTaskElement = document.createElement("p");
    newTaskElement.classList.add('task-style');
    newTaskElement.innerText = `${newTask.task}`;
    const rightDiv = document.createElement('div');
    rightDiv.classList.add('flex', 'center');
    const dueDateElement = document.createElement('p');
    dueDateElement.classList.add('task-style');
    dueDateElement.innerText = `${newTask.dueDate}`;
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('flex', 'center', 'delete-edit-btn');
    // Add icon
    const iconElement = document.createElement('ion-icon');
    iconElement.classList.add('icon-dots');
    iconElement.setAttribute('name', 'ellipsis-vertical-outline');
    deleteBtn.appendChild(iconElement);

    rightDiv.append(dueDateElement, deleteBtn);
    taskDiv.append(newTaskElement, rightDiv);

    tasksDiv.appendChild(taskDiv, rightDiv);

    const project = findProjectById(projectId);
    if (project) {
        project.addTask(newTask);
    }

    hideInputField()
}


function createProject(projectsArray) {
    const inputValue = document.querySelector('#project').value;
    const newProject = new Project(inputValue); 

    const projectsList = document.querySelector('.projects-list');
    const newProjectElement = document.createElement('p');
    newProjectElement.innerText = `${newProject.name}`;

    newProjectElement.addEventListener('click', () => {
        selectProject(newProject, newProject.id);
    });
    
    projectsList.appendChild(newProjectElement);

    projectsArray.push(newProject);

    hideProjectInputField();
}


function selectProject(project, projectId) { 
    header.textContent = project.name;

    const selectedProject = findProjectById(projectId);
    selectedProjectId = projectId;

    showTasksProject(selectedProject);
}


function showTasksProject(project) {
    const tasks = project.tasks;

    tasksDiv.innerHTML = '';

    tasks.forEach((task) => {
        const newTaskElement = document.createElement("p");
        newTaskElement.innerText = `${task.task} - Due: ${task.dueDate}`;
        tasksDiv.appendChild(newTaskElement);
    })
}


function showAllTasks(tasks) {
    header.textContent = 'All Tasks';
    tasksDiv.innerHTML = '';
    selectedProjectId = 0;

    tasks.forEach((task) => {
        const newTaskElement = document.createElement("p");
        newTaskElement.innerText = `${task.task} - Due: ${task.dueDate}`;
        tasksDiv.appendChild(newTaskElement);
    })
}

// SORTING BY DATE
// myArray.sort(function compare(a, b) {
//     var dateA = new Date(a.date);
//     var dateB = new Date(b.date);
//     return dateA - dateB;
// });


export { addInputField, hideInputField, addProjectInputField, hideProjectInputField, createTask, createProject, showAllTasks };