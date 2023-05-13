import { Task, Project } from "./classes.js";
import { projects } from "../index.js"

const addTaskBtn = document.querySelector('.projects-btn-div');
const inputDiv = document.querySelector('.projects-input-div');
const projectInputField = document.querySelector('.input-project-div');

let selectedProject = null;
export let selectedProjectId = null;

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


function findProjectById(projectId) {
    return projects.find(project => project.id === projectId);
}


function createTask(projectId = null) {
    const inputValue = document.querySelector('.input').value;
    const inputDate = document.querySelector('.input-date').value;
    const newTask = new Task(inputValue, inputDate);

    const tasksDiv = document.querySelector(".tasks-div");
    const newTaskElement = document.createElement("p");
    newTaskElement.innerText = `${newTask.task} - Due: ${newTask.dueDate}`;
  
    tasksDiv.appendChild(newTaskElement);

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
    const header = document.querySelector('.header-tasks');
    header.textContent = project.name;

    selectedProject = findProjectById(projectId);
    selectedProjectId = projectId;
}


export { addInputField, hideInputField, addProjectInputField, hideProjectInputField, createTask, createProject };