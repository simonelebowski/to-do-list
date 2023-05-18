import { allTasks } from "../index.js"

export class Task {
    static currentId = 1;

    constructor(task, dueDate) {
        this.taskId = Task.currentId++;
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