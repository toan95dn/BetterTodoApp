const addButton = document.querySelector('#addButton');
const addTaskButton = document.querySelector('.createTaskButtonContainer');
const addProjectButton = document.querySelector('.createProjectButtonContainer');

addButton.addEventListener('click', () => {
    changeStatusOfButtons();
})

function changeStatusOfButtons() {
    addButton.classList.toggle('active');
    addTaskButton.classList.toggle('active');
    addProjectButton.classList.toggle('active');
}