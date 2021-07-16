import './style.css';
import './hamburger.css'

//ALL BUTTONS TO ASK A TASK/PROJECT
const addButton = document.querySelector('#addButton');
const addTaskButton = document.querySelector('.createTaskButtonContainer');
const addProjectButton = document.querySelector('.createProjectButtonContainer');
const submitProjectButton = document.querySelector('#submitNewProject');
const submitTaskButton = document.querySelector('#submitNewTask');

//BUTTON TO MAKE THE MENU SLIDE OUT (SMALL SCREEN)
const hamburgerButton = document.querySelector('.hamburger');

// ALL CONTAINERS + POPUP
const menuTab = document.querySelector('.menu');
const listProjectsContainer = document.querySelector('.listProjectsContainer');
const popupModalBg = document.querySelector('.popupModalBg');


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
    addTaskButton.classList.toggle('active');
    addProjectButton.classList.toggle('active');
}

hamburgerButton.addEventListener('click', () => {
    hamburgerButton.classList.toggle('is-active');
    menuTab.classList.toggle('active');
})

//CREATE A NEW PROJECT
addProjectButton.addEventListener('click', () => {
    popupModalBg.classList.add('active');
})

const inputProjectName = document.querySelector('#projectNameInput');
submitProjectButton.addEventListener('click', (e) => {
    e.preventDefault();
    const newProject = document.createElement('li');
    newProject.innerText = inputProjectName.value;
    listProjectsContainer.append(newProject);
    popupModalBg.classList.remove('active');
})

//CREATE A NEW TASK




// IMPORTANT BUTTON -> BUTTONS THAT MODIFY BOTH DATA AND VIEW OR NEED DATA TO SHOW VIEW
//SUBMIT A TASK/PROJECT , DELETE A TASK/PROJECT, TAB HOME/TODAY/WEEK/A PROJECT, SORT BY TIME