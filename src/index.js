import './style.css';
import './hamburger.css'

const addButton = document.querySelector('#addButton');
const addTaskButton = document.querySelector('.createTaskButtonContainer');
const addProjectButton = document.querySelector('.createProjectButtonContainer');
const hamburgerButton = document.querySelector('.hamburger');


addButton.addEventListener('click', () => {
    changeStatusOfButtons();
})

function changeStatusOfButtons() {
    addButton.classList.toggle('active');
    addTaskButton.classList.toggle('active');
    addProjectButton.classList.toggle('active');
}

hamburgerButton.addEventListener('click', () => {
    hamburgerButton.classList.toggle('is-active');
    console.log('asd')
})

