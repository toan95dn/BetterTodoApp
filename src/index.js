import './style.css';
import './hamburger.css';
import './login.css';
import 'normalize.css'
import './login';
import { FireBaseManager } from './FirebaseManager';
import { TaskModel, TaskController } from './Task';
import { TasksManagerModel } from './TasksManager';
import { pubsub } from './pubsub';

const bindEventsWithApp = (() => {
    //All buttons to add a task/project
    const addButton = document.querySelector('#addButton');
    const addTaskOptionButton = document.querySelector('.createTaskButtonContainer');
    const addProjectOptionButton = document.querySelector('.createProjectButtonContainer');

    //Hamburger button, makes the menu slide out
    const hamburgerButton = document.querySelector('.hamburger');

    // All containers + popup
    const menuTab = document.querySelector('.menu');
    const popupModalBg = document.querySelector('.popupModalBg');
    const createProjectForm = document.querySelector('.createProjectModal');
    const createTaskForm = document.querySelector('.createTaskModal');

    //Buttons to close

    const closeTaskForm = document.querySelector('#closeTaskForm');
    closeTaskForm.addEventListener('click', () => {
        createTaskForm.reset();
        popupModalBg.classList.remove('active');
        createTaskForm.classList.remove('active');
    })

    const closeProjectForm = document.querySelector('#closeProjectForm');
    closeProjectForm.addEventListener('click', () => {
        createProjectForm.reset();
        popupModalBg.classList.remove('active');
        createProjectForm.classList.remove('active');
    })

    //
    addButton.addEventListener('click', () => {
        popUporClosedAddTaskOrProject();
    })

    function popUporClosedAddTaskOrProject() {
        changeStatusOfButtons();
    }

    //Close/Open the options to add a project or a task
    function changeStatusOfButtons() {
        addButton.classList.toggle('active');
        addTaskOptionButton.classList.toggle('active');
        addProjectOptionButton.classList.toggle('active');
    }

    hamburgerButton.addEventListener('click', () => {
        hamburgerButton.classList.toggle('is-active');
        menuTab.classList.toggle('active');
    })

    //Create a new project
    addProjectOptionButton.addEventListener('click', () => {
        inputProjectName.placeholder = ''; //reset because if the user make error, the placeholder still show the error
        popupModalBg.classList.add('active');
        createProjectForm.classList.add('active');
        changeStatusOfButtons();
    })

    const inputProjectName = document.querySelector('#projectNameInput');
    createProjectForm.addEventListener('submit', (event) => {
        event.preventDefault();
        if (!TasksManagerModel.containsProjectname(inputProjectName.value)) {
            FireBaseManager.addProjectFirebase(inputProjectName.value);
            pubsub.emit('addProject', inputProjectName.value);
            popupModalBg.classList.remove('active');
            createProjectForm.classList.remove('active');
            createProjectForm.reset();
        }
        else {
            showErrorCreateProject();
        }
    })

    function showErrorCreateProject() {
        createProjectForm.reset();
        inputProjectName.placeholder = `The project's name already exists`;
    }

    //Show up modal to add task
    addTaskOptionButton.addEventListener('click', () => {
        getAllProjectsSelection();
        popupModalBg.classList.add('active');
        createTaskForm.classList.add('active');
        changeStatusOfButtons();
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

    createTaskForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const newTaskData = {
            title: inputTasksTitle.value, detail: inputDescription.value, dueDate: inputDueDate.value,
            priority: inputPriority.value, isDone: false, projectName: inputProjectSelection.value
        };

        const firebaseID = await FireBaseManager.addTaskFirebase(newTaskData);
        const newTaskModel = new TaskModel(inputTasksTitle.value, inputDescription.value,
            inputDueDate.value, inputPriority.value, false, inputProjectSelection.value, firebaseID);
        const newController = new TaskController(newTaskModel);

        pubsub.emit('addTask', newTaskModel);

        createTaskForm.reset();
        createTaskForm.classList.remove('active');
        popupModalBg.classList.remove('active');
    })
})()