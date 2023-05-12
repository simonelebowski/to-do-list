import { Task, Project } from "./classes.js";

const addTaskBtn = document.querySelector('.projects-btn-div');
const inputDiv = document.querySelector('.projects-input-div');
const projectInputField = document.querySelector('.input-project-div');

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

function createProject(projectsArray) {
    const inputValue = document.querySelector('#project').value;
    const newProject = new Project(inputValue); 

    const projectsList = document.querySelector('.projects-list');
    const newProjectElement = document.createElement('p');
    newProjectElement.innerText = `${newProject.name}`;

    newProjectElement.addEventListener('click', () => {
        selectProject(newProject);
    });
    
    projectsList.appendChild(newProjectElement);

    projectsArray.push(newProject);

    hideProjectInputField();
}

function selectProject(project) {
    const header = document.querySelector('.header-tasks');
    header.textContent = project.name;
    // selectedProject = project;
}

export { addInputField, hideInputField, addProjectInputField, hideProjectInputField, createTask, createProject };