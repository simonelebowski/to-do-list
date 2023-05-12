export class Task {
    constructor(task, dueDate) {
        this.task = task;
        this.dueDate = dueDate;
    }
}

export class Project {
    constructor(name) {
        this.name = name;
        this.tasks = [];
    }
}