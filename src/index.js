// import './style.css';
import './hamburger.css';
import './login.css';
import 'normalize.css'
import './login';
import { TaskModel, TaskView, TaskController } from './Task';
import { TasksManagerModel } from './TasksManager';
import { pubsub } from './pubsub';


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

//button to close

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

    // const newProject = document.createElement('li');
    // newProject.innerText = inputProjectName.value;
    // listProjectsContainer.append(newProject);

    // TasksManagerModel.addNewProject(inputProjectName.value);
    pubsub.emit('addProject', inputProjectName.value);
    TasksManagerModel.printOutProject();

    popupModalBg.classList.remove('active');
    createProjectModal.classList.remove('active');
})

//CREATE A NEW TASK
addTaskOptionButton.addEventListener('click', () => {
    getAllProjectsSelection();
    popupModalBg.classList.add('active');
    createTaskModal.classList.add('active');
})

//WHEN CLICK THE BUTTON TO POPUP FORM TO ADD TASK, PUT ALL THE POSSIBLE PROJECT TO THE PROJECT SELECTION
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


submitTaskButton.addEventListener('click', () => {
    console.log(inputDueDate.value);
    const newTaskModel = new TaskModel(inputTasksTitle.value, inputDescription.value,
        inputDueDate.value, inputPriority.value, inputProjectSelection.value);
    const newController = new TaskController(newTaskModel);

    //title, detail, dueDate, priority, projectName
    pubsub.emit('addTask', newTaskModel);

    createTaskModal.classList.remove('active');
    popupModalBg.classList.remove('active');
})



/////////////////////////////////////////



// const inputTaskTitle;
// const inputDescription;


let m = (function addDemoProjectAndTask() {
    pubsub.emit('addProject', '1stDemo');
    pubsub.emit('addProject', '2ndDemo');
    pubsub.emit('addProject', '3rdDemo');
    pubsub.emit('addProject', '4thDemo');
    pubsub.emit('addProject', '5thDemo');
    pubsub.emit('addProject', '6thDemo');
    pubsub.emit('addProject', '7thDemo');
    pubsub.emit('addProject', '8thDemo');
    pubsub.emit('addProject', '9thDemoooo');
    pubsub.emit('addProject', '1tDemo');
    pubsub.emit('addProject', '2dDemo');
    pubsub.emit('addProject', '3dDemo');
    pubsub.emit('addProject', '4hDemo');
    pubsub.emit('addProject', '5hDemo');
    pubsub.emit('addProject', '6Demo');
    pubsub.emit('addProject', '7Demo');
    pubsub.emit('addProject', 'thDemo');
    pubsub.emit('addProject', '9hDemoooo');

})()

let k = (function addADemoTask() {
    for (let i = 1; i < 12; i++) {
        let currPri;
        if (i % 2 === 0) {
            currPri = 'High';
        }
        else {
            currPri = i % 3 === 0 ? 'Low' : 'Medium';
        }
        const newTask = new TaskModel('Task_' + i + '_1stDemo', 'none', `2021-07-${i + 15}`, currPri, '1stDemo');
        pubsub.emit('addTask', newTask)
    }

    for (let i = 1; i < 6; i++) {
        const newTask = new TaskModel('Task_' + i + '_2ndDemo', 'none', `2021-${'0' + i}-10`, 'High', '2ndDemo');
        pubsub.emit('addTask', newTask)
    }
})()




// addButton.click();
// addProjectOptionButton.click();
// addTaskOptionButton.click()


// IMPORTANT BUTTON -> BUTTONS THAT MODIFY BOTH DATA AND VIEW OR NEED DATA TO SHOW VIEW
//SUBMIT A TASK/PROJECT , DELETE A TASK/PROJECT, TAB HOME/TODAY/WEEK/A PROJECT, SORT BY TIME