import { Task, Project } from "./classes.js";
import { allTasks, projects, addProjectField } from "../index.js";
import { isToday, isThisWeek } from "date-fns";

const addTaskBtn = document.querySelector('.projects-btn-div');
const inputDiv = document.querySelector('.projects-input-div');
const projectInputField = document.querySelector('.input-project-div');
const tasksDiv = document.querySelector(".tasks-div");
const header = document.querySelector('.header-tasks');
const taskInputField = document.querySelector('.input');
const taskInputDate = document.querySelector('.input-date');
const errorText = document.querySelector('.error-text');

export let selectedProjectId = null;
export let isNavHidden = false; 


// ----------ADD AND HIDE FUNCTIONS--------------------
function addInputField() {
    addTaskBtn.classList.add('hidden');
    inputDiv.classList.remove('hidden');
}

function hideInputField() {
    addTaskBtn.classList.remove('hidden');
    inputDiv.classList.add('hidden');
    taskInputField.classList.remove('error');
    errorText.classList.add('hidden');
}

function addProjectInputField() {
    addProjectField.classList.add('hidden');
    projectInputField.classList.remove('hidden');

};

function hideProjectInputField() {
    addProjectField.classList.remove('hidden');
    projectInputField.classList.add('hidden');
};

function hideNav() {
    const nav = document.querySelector('.nav');
    nav.classList.toggle('hidden');
}
// ----------------------------------------------------


function findProjectById(projectId) {
    return projects.find(project => project.id === projectId);
}


function createTask(projectId = null) {
    const inputValue = taskInputField.value;
    const inputDate = taskInputDate.value;

    // Error handling - Empty fields
    if (inputValue.trim() === '') {
        taskInputField.classList.add('error');
        errorText.classList.remove('hidden');
        return;
    }

    // Create task object
    const newTask = new Task(inputValue, inputDate);

    // Show task
    showTask(newTask)

    // Add task to a project
    const project = findProjectById(projectId);
    if (project) {
        project.addTask(newTask);
    }

    // Clearing input fields
    taskInputField.value = '';
    taskInputDate.value = '';

    hideInputField()
}


function showTask(task) {
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('flex', 'center', 'space', 'task-div');
    taskDiv.id = task.taskId;
    const newTaskElement = document.createElement("p");
    newTaskElement.classList.add('task-style', 'task-name');
    newTaskElement.innerText = `${task.task}`;
    const rightDiv = document.createElement('div');
    rightDiv.classList.add('flex', 'center', 'date-div');
    const dueDateElement = document.createElement('p');
    dueDateElement.classList.add('task-style', 'task-date');
    dueDateElement.innerText = `${task.dueDate}`;
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('flex', 'center', 'delete-edit-btn');

    // Add icon
    const iconElement = document.createElement('ion-icon');
    iconElement.classList.add('icon-dots');
    iconElement.addEventListener('click', (event) => {
        showEdit(event);
    })
    iconElement.setAttribute('name', 'ellipsis-vertical-outline');
    const editDeleteDiv = document.createElement('div', 'hidden');
    editDeleteDiv.classList.add('edit-delete-div', 'hidden');
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('edit-btns');
    editButton.addEventListener('click', (event) => {
        edit(event);
    })
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('edit-btns');
    deleteButton.addEventListener('click', (event) => {
        deleteTask(event);
    })
    editDeleteDiv.append(editButton, deleteButton);
    deleteBtn.append(iconElement, editDeleteDiv);

    // Append the elements created
    rightDiv.append(dueDateElement, deleteBtn);
    taskDiv.append(newTaskElement, rightDiv);
    tasksDiv.appendChild(taskDiv);
}


// function to be completed
function edit(event) {
    const taskDiv = event.target.closest('.task-div');
    const taskNameElement = event.target.closest('.task-div').querySelector('.task-name');
    const taskDateElement = event.target.closest('.date-div').querySelector('.task-date');
    const taskName = taskNameElement.textContent;
    const taskDate = taskDateElement.textContent;
    const editInput = inputDiv.cloneNode(true);

    // 1. Open the add task inputs when clicking on edit - DONE
    taskDiv.classList.add('hidden');
    taskDiv.insertAdjacentElement('afterend', editInput);
    editInput.classList.remove('hidden');

    // 2. Add the content - DONE
    const editNameElement = editInput.querySelector('.input');
    const editDateElement = editInput.querySelector('.input-date');
    editNameElement.value = taskName;     
    editDateElement.value = taskDate;
    
    // 3. Change the content of the task with the new content from the inputs
    const addBtn = editInput.querySelector('.input-btns .add-task');
    addBtn.addEventListener('click', () => {
        const newTaskName = editNameElement.value;
        const newTaskDate = editDateElement.value;

        editAdd(taskDiv, taskNameElement, taskDateElement, newTaskName, newTaskDate, editInput);
    })

    // 4. Keep the same content when clicking cancel and hide the inputs
    const cancelBtn = editInput.querySelector('.input-btns .cancel-task');
    cancelBtn.addEventListener('click', () => {
        editCancel(editInput, taskDiv);
    });
}


function editAdd(taskDiv, taskNameElement, taskDateElement, newName, newDate, editInput) {
    const taskId = taskDiv.id;
    const foundTask = allTasks.find(task => task.taskId == taskId);

    foundTask.task = newName;
    foundTask.dueDate = newDate;
    
    taskNameElement.textContent = newName;
    taskDateElement.textContent = newDate;
    editCancel(editInput, taskDiv);
}


function editCancel(editInput, taskDiv) {
    editInput.remove();
    taskDiv.classList.remove('hidden');
}


function deleteTask(event) {
    const taskDiv = event.target.closest('.task-div');
    const taskId = taskDiv.id;
    const index = allTasks.findIndex(task => task.taskId == taskId);

    if (index !== -1) {
        allTasks.splice(index, 1);
    }
    
    taskDiv.remove();
}


function showEdit(event) {
    const clickedElement = event.target;
    const nextSibling = clickedElement.nextElementSibling;

    if (!nextSibling.classList.contains('hidden')) {
        nextSibling.classList.add('hidden');
        return;
    }

    const divs = document.querySelectorAll('.edit-delete-div');
    divs.forEach(function(div) {
        div.classList.add('hidden');
    })
    
    nextSibling.classList.remove('hidden');
}


function hideEdit(event) {
    const divToHide = document.querySelectorAll('.edit-delete-div');
    const iconDots = Array.from(document.querySelectorAll('.icon-dots'));

    divToHide.forEach(function(div) {
        if (!div.contains(event.target) && !iconDots.includes(event.target)) {
            div.classList.add('hidden');
        }
    })
}


function createProject(projectsArray) {
    const inputValue = document.querySelector('#project').value;
    const newProject = new Project(inputValue); 

    const projectsList = document.querySelector('.projects-list');
    const newProjectElement = document.createElement('button');
    newProjectElement.classList.add('menu-btn');
    newProjectElement.innerText = `${newProject.name}`;

    newProjectElement.addEventListener('click', () => {
        selectProject(newProject, newProject.id);
        highlightSelectedMenu(newProjectElement);
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
        showTask(task);
    })
}


function showAllTasks(tasks) {
    header.textContent = 'All Tasks';
    tasksDiv.innerHTML = '';
    addTaskBtn.classList.remove('hidden');
    selectedProjectId = 0;

    tasks.forEach((task) => {
        showTask(task);
    })
}


function showTodayTasks() {
    header.textContent = 'Today';
    addTaskBtn.classList.add('hidden');
    tasksDiv.innerHTML = '';

    allTasks.forEach(task => {
        if (isToday(new Date(task.dueDate))) {
            showTask(task);
        }
    })
}


function showWeekTasks() {
    header.textContent = 'This Week';
    addTaskBtn.classList.add('hidden');
    tasksDiv.innerHTML = '';

    allTasks.forEach(task => {
        if (isThisWeek(new Date(task.dueDate))) {
            showTask(task);
        }
    })
}


function highlightSelectedMenu(menuClicked) {
    const menuBtns = document.querySelectorAll('.menu-btn');
    menuBtns.forEach(btn => {
        btn.classList.remove('highlight');
    })

    menuClicked.classList.add('highlight');
}


function hideNavResize() {
    const nav = document.querySelector('.nav');

    if (window.innerWidth <= 650 && !isNavHidden) {
        nav.classList.add('hidden');
        isNavHidden = true;
    } else if (window.innerWidth > 650 && isNavHidden) {
        nav.classList.remove('hidden');
        isNavHidden = false;
    }
}


// SORTING BY DATE
// myArray.sort(function compare(a, b) {
//     var dateA = new Date(a.date);
//     var dateB = new Date(b.date);
//     return dateA - dateB;
// });


export { addInputField, hideInputField, addProjectInputField, hideProjectInputField, createTask, createProject, showAllTasks, hideEdit, 
    highlightSelectedMenu, showTodayTasks, showWeekTasks, hideNavResize, hideNav };