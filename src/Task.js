import { TasksManagerModel, TasksManagerView } from "./TasksManager";
import dayjs from 'dayjs';
import { pubsub } from "./pubsub";


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

    removeTask() {

    }

    moveTask() {

    }
}

class TaskView {
    #taskView;
    #checkBoxView;
    #titleView;
    #dueDateView;
    #editButtonView;
    #deleteButtonView;

    constructor(title, dueDate, priority) {
        const listOfTasksView = document.querySelector('.listOfTasks');

        //Create a taskView container and push all elements inside of it
        this.#taskView = document.createElement('ul');
        this.#taskView.classList.add('task');
        this.#taskView.classList.add(priority);

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

    createShowDetailTaskView(title, dueDate, projectName, detail, priority) {

        const popUpBg = document.createElement('div');
        popUpBg.classList.add('popUpBg');

        popUpBg.innerHTML =
            `<div class='popUpDetail'>
                <div id='closeDetailButton' class="material-icons">close</div>
                <p>
                    <h3>${title}</h3>
                    <div><span> Due Date: </span> <span>${dayjs(dueDate).format('MM/DD/YYYY')}</span></div>
                    <div><span>Project: </span> <span>${projectName}</span></div>
                    <div><span>Priority: </span><span>${priority}</span></div>
                    <p><span>Detail: </span> <span>${detail}</span></p>
                </p>
            </div>`

        document.querySelector('body').append(popUpBg);
    }

    turnOffPopup() {
        document.querySelector('.popUpBg').remove();
    }

    showEditPanelTask(title, dueDate, detail) {
        const popUpBg = document.createElement('div');
        popUpBg.classList.add('popUpBg');


        popUpBg.innerHTML = `<form class="editTaskModal active">
            <h2>Editing... </h2>

            <label for="taskTitleEdit">Task's title</label>
            <input type="text" name="taskTitleEdit"  id="taskTitleEdit" required>

            <label for="dueDateEdit" >Due date</label>
            <input type="date" name="dueDateEdit" id="dueDateEdit"  required>

            <label for="descriptionEdit">Description</label>
            <textarea name="descriptionEdit" id="descriptionEdit" cols="30" rows="10"></textarea>

            <label for="priorityEdit">Pick the priority</label>
            <select name="priorityEdit" id="priorityEdit">
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>

            <label for="projectSelectionEdit">Pick the project</label>
            <select name="projectSelectionEdit" id="projectSelectionEdit">
            </select>

            <button class="material-icons" type="button" id="closeEditedForm">clear</button>
            <Button id="submitEditedTask" type="button">Confirm Edit</Button>
             
            </form>`

        document.querySelector('body').prepend(popUpBg);
    }
}

class TaskController {
    #taskModel;
    #taskView;

    constructor(taskModel) {
        this.#taskModel = taskModel;
        this.#taskView = new TaskView(taskModel.getTitle(), taskModel.getDueDate(), taskModel.getPriority());

        this.#bindShowDetailEvent();
        this.#bindDeleteTaskEvent();
        this.#bindEditEvent();
    }

    #bindShowDetailEvent() {
        const currTaskView = this.#taskView.getTaskView();
        currTaskView.addEventListener('click', () => {
            this.#taskView.createShowDetailTaskView(
                this.#taskModel.getTitle(),
                this.#taskModel.getDueDate(),
                this.#taskModel.getProjectName(),
                this.#taskModel.getDetail(),
                this.#taskModel.getPriority()
            );
            this.#bindCloseDetailEvent();
        })
    }

    #bindCloseDetailEvent() {
        const closeDetailButton = document.querySelector('#closeDetailButton');
        closeDetailButton.addEventListener('click', () => this.#taskView.turnOffPopup());
    }

    //--------------------Edit a task -----------------------
    #bindEditEvent() {
        const editButton = this.#taskView.getEditButtonView();
        editButton.addEventListener('click', (event) => {
            event.stopPropagation();
            this.#taskView.showEditPanelTask(
                this.#taskModel.getTitle(),
                this.#taskModel.getDueDate(),
                this.#taskModel.getDetail()
            );


            // console.log(this.#taskModel)

            //Get all input 
            const editTitleInput = document.querySelector('#taskTitleEdit');
            const editDueDateInput = document.querySelector('#dueDateEdit');
            const editDetailInput = document.querySelector('#descriptionEdit');
            const editPriorityInput = document.querySelector('#priorityEdit');
            const editProjectInput = document.querySelector('#projectSelectionEdit');

            //Set default value for edit popup
            editTitleInput.value = this.#taskModel.getTitle();
            editDueDateInput.value = this.#taskModel.getDueDate();

            editPriorityInput.querySelectorAll('option').forEach(option => {
                if (option.value === this.#taskModel.getPriority()) {
                    editPriorityInput.value = option.value;
                }
            })


            this.#bindCloseEditPopupEvent();
        })
    }

    #bindCloseEditPopupEvent() {
        const closeEditedFormButton = document.querySelector('#closeEditedForm');
        closeEditedFormButton.addEventListener('click', () => {
            this.#taskView.turnOffPopup();
        })
    }

    //------------ 
    #bindDeleteTaskEvent() {
        const deleteTaskButton = this.#taskView.getDeleteButtonView();
        deleteTaskButton.addEventListener('click', (event) => {
            event.stopPropagation();
            this.#taskView.removeView();
            pubsub.emit('removeTask', this.#taskModel);
        })
    }

}



export { TaskModel, TaskView, TaskController }

