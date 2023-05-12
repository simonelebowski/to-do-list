export class Task {
    constructor(task, dueDate) {
        this.task = task;
        this.dueDate = dueDate;
    }
}

export class Project {
    static currentId = 1;

    constructor(name) {
        this.id = Project.currentId++;
        this.name = name;
        this.tasks = [];
    }
}