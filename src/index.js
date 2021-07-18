import './style.css';
import './hamburger.css'

import { TaskModel, TaskView, TaskController } from './Task';
import { ProjectManager } from './ProjectManager';

//ALL BUTTONS TO ASK A TASK/PROJECT
const addButton = document.querySelector('#addButton');
const addTaskOptionButton = document.querySelector('.createTaskButtonContainer');
const addProjectOptionButton = document.querySelector('.createProjectButtonContainer');
const submitProjectButton = document.querySelector('#submitNewProject');
const submitTaskButton = document.querySelector('#submitNewTask');

//BUTTON TO MAKE THE MENU SLIDE OUT (SMALL SCREEN)
const hamburgerButton = document.querySelector('.hamburger');

// ALL CONTAINERS + POPUP
const menuTab = document.querySelector('.menu');
const listProjectsContainer = document.querySelector('.listProjectsContainer');
const listTasksContainer = document.querySelector('.listOfTasks');
const popupModalBg = document.querySelector('.popupModalBg');
const createProjectModal = document.querySelector('.createProjectModal');
const createTaskModal = document.querySelector('.createTaskModal');

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

    const newProject = document.createElement('li');
    newProject.innerText = inputProjectName.value;
    listProjectsContainer.append(newProject);

    ProjectManager.addNewProject(inputProjectName.value);
    ProjectManager.printOutProject();

    popupModalBg.classList.remove('active');
    createProjectModal.classList.remove('active');
})

//CREATE A NEW TASK
addTaskOptionButton.addEventListener('click', () => {
    popupModalBg.classList.add('active');
    createTaskModal.classList.add('active');
})

const inputTasksTitle = document.querySelector('#taskTitleInput');
const inputDueDate = document.querySelector('#dueDateInput');
const inputDescription = document.querySelector('#descriptionInput');
const inputPriority = document.querySelector('#priorityInput');


submitTaskButton.addEventListener('click', () => {
    const newTaskModel = new TaskModel(inputTasksTitle.value, inputDescription.value, inputDueDate.value, "Low", "Cona");
    const newTaskView = new TaskView(inputTasksTitle.value, inputDueDate.value);
    const newController = new TaskController(newTaskModel, newTaskView);
    createTaskModal.classList.remove('active');
    popupModalBg.classList.remove('active');
})


let k = (function addADemoTask() {
    const newTaskView = new TaskView("DemoTest", '10/10/2020');
    const newTaskModel = new TaskModel("DemoTest", 'none', '11/10/2020', "asd", "k");
    const newController = new TaskController(newTaskModel, newTaskView);

    const newTaskView1 = new TaskView("DemoTest_1", '10/10/2020');
    const newTaskModel1 = new TaskModel("DemoTest_1", 'none', '11/10/2020', "asd", "k");
    const newController1 = new TaskController(newTaskModel1, newTaskView1);
})()
// const inputTaskTitle;
// const inputDescription;










// IMPORTANT BUTTON -> BUTTONS THAT MODIFY BOTH DATA AND VIEW OR NEED DATA TO SHOW VIEW
//SUBMIT A TASK/PROJECT , DELETE A TASK/PROJECT, TAB HOME/TODAY/WEEK/A PROJECT, SORT BY TIME