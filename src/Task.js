class TaskModel {
    #title;
    #description;
    #dueDate;
    #priority;
    #isDone;
    #projectName;

    constructor(title, description, dueDate, priority, projectName) {
        this.#title = title;
        this.#description = description;
        this.#dueDate = dueDate;
        this.#priority = priority;
        this.#isDone = false;
        this.#projectName = projectName;
    }

    //getters
    getTitle() { return this.#title; }
    getDetail() { return this.#description; }
    getDueDate() { return this.#dueDate; }
    getStatus() { return this.#isDone; }
    getPriority() { return this.#priority; }
    getProjectName() { return this.#projectName; }

    //setters
    setTitle(newTitle) { this.#title = newTitle; }
    setDetail(newDescription) { this.#description = newDescription; }
    setDueDate(newDueDate) { this.#dueDate = newDueDate; }
    setStatus(newStatus) { this.#isDone = newStatus; }
    setPriority(newPriority) { this.#priority = newPriority; }
    setProjectName(newProjectName) { this.#projectName = newProjectName; }
}

class TaskView {
    #taskView;
    #checkBoxView;
    #titleView;
    #dueDateView;
    #editButtonView;
    #deleteButtonView;

    constructor(title, dueDate) {
        const projectInfoContainer = document.querySelector('projectInfoContainer');

        this.#taskView = document.createElement('ul');
        this.#taskView.classList.add('task');

        this.#createAViewAndAddItToTaskView(this.#checkBoxView, 'check_box', 'material-icons');
        this.#createAViewAndAddItToTaskView(this.#titleView, title);
        this.#createAViewAndAddItToTaskView(this.#dueDateView, dueDate);
        this.#createAViewAndAddItToTaskView(this.#deleteButtonView, 'delete', 'material-icons');

        projectInfoContainer.add(this.#taskView);
    }

    #createAViewAndAddItToTaskView(newView, textInside, ...allClassNames) {
        newView = document.createElement('div');
        newView.innerText = textInside;
        allClassNames.forEach((className) => button.classList.add(className));
        this.#taskView.append(newView);
    }

    removeView() {

    }

    updateTitleView(newTitle) {

    }

    updateProgressView(isDone) {

    }


}

class TaskController {
    #taskModel;
    #taskView;
    constructor(title, description, dueDate, priority, projectName) {
        this.#taskModel = new TaskModel(title, description, dueDate, priority, projectName);
        this.#taskView = new TaskView();
    }
}

export { TaskModel, TaskView, TaskController }

