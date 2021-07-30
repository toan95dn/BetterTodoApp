import './style.css';
import './hamburger.css';
import './login.css';
import 'normalize.css'
import './login';
import { FireBaseManager } from './FirebaseManager';
import { TaskModel, TaskController } from './Task';
import { TasksManagerModel } from './TasksManager';
import { pubsub } from './pubsub';

//All buttons to add a task/project
const addButton = document.querySelector('#addButton');
const addTaskOptionButton = document.querySelector('.createTaskButtonContainer');
const addProjectOptionButton = document.querySelector('.createProjectButtonContainer');
const submitProjectButton = document.querySelector('#submitNewProject');
const submitTaskButton = document.querySelector('#submitNewTask');

//Hamburger button, makes the menu slide out
const hamburgerButton = document.querySelector('.hamburger');

// All containers + popup
const menuTab = document.querySelector('.menu');
const listProjectsContainer = document.querySelector('.listProjectsContainer');
const listTasksContainer = document.querySelector('.listOfTasks');
const popupModalBg = document.querySelector('.popupModalBg');
const createProjectModal = document.querySelector('.createProjectModal');
const createTaskModal = document.querySelector('.createTaskModal');

//Buttons to close

const closeTaskForm = document.querySelector('#closeTaskForm');
closeTaskForm.addEventListener('click', () => {
    popupModalBg.classList.remove('active');
    createTaskModal.classList.remove('active');
})

const closeProjectForm = document.querySelector('#closeProjectForm');
closeProjectForm.addEventListener('click', () => {
    popupModalBg.classList.remove('active');
    createProjectModal.classList.remove('active');
})

//
addButton.addEventListener('click', () => {
    popUporClosedAddTaskOrProject();
})

function popUporClosedAddTaskOrProject() {
    changeStatusOfButtons();
}

//FUNCTION WILL TOGGLE ALL 'ACTIVE' VALUE OF BUTTON, SO THAT WHEN 1 THING POP UP, OTHER THINGS CLOSED
function changeStatusOfButtons() {
    addButton.classList.toggle('active');
    addTaskOptionButton.classList.toggle('active');
    addProjectOptionButton.classList.toggle('active');
}

hamburgerButton.addEventListener('click', () => {
    hamburgerButton.classList.toggle('is-active');
    menuTab.classList.toggle('active');
})

//CREATE A NEW PROJECT
addProjectOptionButton.addEventListener('click', () => {
    popupModalBg.classList.add('active');
    createProjectModal.classList.add('active');
})

const inputProjectName = document.querySelector('#projectNameInput');
submitProjectButton.addEventListener('click', (e) => {
    e.preventDefault();
    FireBaseManager.addProjectFirebase(inputProjectName.value);
    pubsub.emit('addProject', inputProjectName.value);
    popupModalBg.classList.remove('active');
    createProjectModal.classList.remove('active');
})

//Show up modal to add task
addTaskOptionButton.addEventListener('click', () => {
    getAllProjectsSelection();
    popupModalBg.classList.add('active');
    createTaskModal.classList.add('active');
})

//Get all projects for selection when the popup modal to create a task show up
const inputProjectSelection = document.querySelector('#projectSelectionInput');
function getAllProjectsSelection() {
    while (inputProjectSelection.firstElementChild) {
        inputProjectSelection.firstElementChild.remove();
    }

    TasksManagerModel.getAllProjects().forEach((Project) => {
        const projectOption = document.createElement('option');
        projectOption.innerText = Project;
        inputProjectSelection.append(projectOption);
    });
}
//

const inputTasksTitle = document.querySelector('#taskTitleInput');
const inputDueDate = document.querySelector('#dueDateInput');
const inputDescription = document.querySelector('#descriptionInput');
const inputPriority = document.querySelector('#priorityInput');


submitTaskButton.addEventListener('click', async () => {

    const newTaskData = {
        title: inputTasksTitle.value, detail: inputDescription.value, dueDate: inputDueDate.value,
        priority: inputPriority.value, isDone: false, projectName: inputProjectSelection.value
    };

    const firebaseID = await FireBaseManager.addTaskFirebase(newTaskData);
    const newTaskModel = new TaskModel(inputTasksTitle.value, inputDescription.value,
        inputDueDate.value, inputPriority.value, false, inputProjectSelection.value, firebaseID);
    const newController = new TaskController(newTaskModel);

    pubsub.emit('addTask', newTaskModel);

    createTaskModal.classList.remove('active');
    popupModalBg.classList.remove('active');
})







