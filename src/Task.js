import { ProjectManager } from "./ProjectManager";
import dayjs from 'dayjs';

class TaskModel {
    #title;
    #detail;
    #dueDate;
    #priority;
    #isDone;
    #projectName;

    constructor(title, detail, dueDate, priority, projectName) {
        this.updateTask(title, detail, dueDate, priority, projectName);
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
    setDetail(newDescription) { this.#detail = newDescription; }
    setDueDate(newDueDate) { this.#dueDate = newDueDate; }
    setStatus(newStatus) { this.#isDone = newStatus; }
    setPriority(newPriority) { this.#priority = newPriority; }
    setProjectName(newProjectName) { this.#projectName = newProjectName; }

    //
    updateTask(title, detail, dueDate, priority, projectName) {
        this.#title = title;
        this.#detail = detail;
        this.#dueDate = dueDate;
        this.#priority = priority;
        this.#isDone = false;
        this.#projectName = projectName;
    }

}

class TaskView {
    #taskView;
    #checkBoxView;
    #titleView;
    #dueDateView;
    #editButtonView;
    #deleteButtonView;

    constructor(title, dueDate) {
        const listOfTasksView = document.querySelector('.listOfTasks');

        //Create a taskView container and push all elements inside of it
        this.#taskView = document.createElement('ul');
        this.#taskView.classList.add('task');

        this.#checkBoxView = this.#createView('check_box', 'material-icons');
        this.#titleView = this.#createView(title);
        this.#dueDateView = this.#createView(dayjs(dueDate).format('MM/DD/YYYY'));
        this.#editButtonView = this.#createView('edit', 'material-icons');
        this.#deleteButtonView = this.#createView('delete', 'material-icons');

        this.#taskView.append(this.#checkBoxView, this.#titleView, this.#dueDateView, this.#editButtonView, this.#deleteButtonView);

        listOfTasksView.append(this.#taskView);

        //
    }

    //Getters
    getTaskView() {
        return this.#taskView;
    }

    getEditButtonView() {
        return this.#editButtonView;
    }

    getDeleteButtonView() {
        return this.#deleteButtonView;
    }


    //Create a view an element in taskView and add it to the taskView
    #createView(textInside, ...allClassNames) {
        const newView = document.createElement('div');
        newView.innerText = textInside;
        allClassNames.forEach((className) => newView.classList.add(className));
        return newView;
    }

    removeView() {
        this.#taskView.remove();
    }

    updateTitleView(newTitle) {
        this.#titleView.innerText = newTitle;
    }

    updateProgressView(isDone) {
        //switch check box and text
    }

    createShowDetailTaskView(title, dueDate, projectName, detail) {

        const detailPopup = document.createElement('div');
        detailPopup.classList.add('popUpDetailBg');

        detailPopup.innerHTML =
            `<div class='popUpDetail'>
                <div id='closeDetailButton' class="material-icons">close</div>
                <p>
                    <h3>${title}</h3>
                    <div><span> Due Date: </span> <span>${dayjs(dueDate).format('MM/DD/YYYY')}</span></div>
                    <div><span>Project: </span> <span>${projectName}</span></div>
                    <p><span>Detail: </span> <span>${detail}</span></p>
                </p>
            </div>`

        document.querySelector('body').append(detailPopup);
    }

    turnOffDetailTaskView() {
        document.querySelector('.popUpDetailBg').remove();
    }

    showEditPanelTask() {

    }
}

class TaskController {
    #taskModel;
    #taskView;

    constructor(taskModel, taskView) {
        this.#taskModel = taskModel;
        this.#taskView = taskView;

        this.#bindShowDetailEvent();
        this.#bindEditEvent();
        this.#bindDeleteTaskEvent();
    }

    #bindShowDetailEvent() {
        const currTaskView = this.#taskView.getTaskView();
        currTaskView.addEventListener('click', () => {
            this.#taskView.createShowDetailTaskView(
                this.#taskModel.getTitle(),
                this.#taskModel.getDueDate(),
                this.#taskModel.getProjectName(),
                this.#taskModel.getDetail()
            );
            //Bind the close event to the 'X' button to close the popup detail 
            this.#bindCloseDetailEvent();
        })
    }

    #bindCloseDetailEvent() {
        const closeDetailButton = document.querySelector('#closeDetailButton');
        closeDetailButton.addEventListener('click', () => this.#taskView.turnOffDetailTaskView());
    }


    #bindEditEvent() {
        const editButton = this.#taskView.getEditButtonView();
        editButton.addEventListener('click', (event) => {
            event.stopPropagation();
        })
    }

    #bindDeleteTaskEvent() {
        const deleteTaskButton = this.#taskView.getDeleteButtonView();
        deleteTaskButton.addEventListener('click', (event) => {
            event.stopPropagation();
            this.#taskView.removeView();
        })
    }

}

let k = (function addADemoTask() {
    const newTaskView = new TaskView("DemoTest", '10/10/2020');
    const newTaskModel = new TaskModel("DemoTest", 'none', '11/10/2020', "asd", "k");
    const newController = new TaskController(newTaskModel, newTaskView);

    const newTaskView1 = new TaskView("DemoTest_1", '10/10/2020');
    const newTaskModel1 = new TaskModel("DemoTest_1", 'none', '11/10/2020', "asd", "k");
    const newController1 = new TaskController(newTaskModel1, newTaskView1);
})()

export { TaskModel, TaskView, TaskController }

