import { allTasks } from "../index.js"

export class Task {
    constructor(task, dueDate) {
        this.task = task;
        this.dueDate = dueDate;

        allTasks.push(this);
    }
}

export class Project {
    static currentId = 1;

    constructor(name) {
        this.id = Project.currentId++;
        this.name = name;
        this.tasks = [];
    }

    addTask(task) {
        this.tasks.push(task);
      }
}