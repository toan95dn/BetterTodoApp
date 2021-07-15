class Task {
    #title;
    #detail;
    #dueDate;
    #priority;
    #isDone;
    #projectName;

    constructor(title, detail, dueDate, priority, projectName) {
        this.#title = title;
        this.#detail = detail;
        this.#dueDate = dueDate;
        this.#priority = priority;
        this.#isDone = false;
        this.#projectName = projectName;
    }

    //getters
    getTitle() { return this.#title; }
    getDetail() { return this.#detail; }
    getDueDate() { return this.#dueDate; }
    getStatus() { return this.#isDone; }
    getPriority() { return this.#priority; }
    getProjectName() { return this.#projectName; }

    //setters
    setTitle(newTitle) { this.#title = newTitle; }
    setDetail(newDetail) { this.#detail = newDetail; }
    setDueDate(newDueDate) { this.#dueDate = newDueDate; }
    setStatus(newStatus) { this.#isDone = newStatus; }
    setPriority(newPriority) { this.#priority = newPriority; }
    setProjectName(newProjectName) { this.#projectName = newProjectName; }
}

export { Task }

