import dayjs from "dayjs";
import isToday from 'dayjs/plugin/isToday';
dayjs.extend(isToday);
import { pubsub } from "./pubsub";
import { TaskController, TaskModel, TaskView } from "./Task";

const TasksManagerModel = (() => {
    //tasksMap is initialized with an empty project name, all tasks created without projectname will be put in
    const projectMap = new Map();
    projectMap.set('Inbox', []);

    const addNewProject = (projectName) => {
        if (!projectMap.has(projectName)) {
            projectMap.set(projectName, []);
            return true;
        }
        return false;
    }

    const removeProject = (projectName) => {
        projectMap.delete(projectName);
    }
    pubsub.on('removeProject', removeProject);

    const addNewTask = (task) => {
        projectMap.get(task.getProjectName()).push(task);
        //TODO
        //Add the task on firebase ?
    }
    pubsub.on('addTask', addNewTask);

    const removeTask = (task) => {
        const currProjectName = task.getProjectName();
        const listTasksOfCurrProject = projectMap.get(currProjectName);
        listTasksOfCurrProject.splice(listTasksOfCurrProject.indexOf(task), 1);
        //TODO
        //Remove the task on Firebase ???Can do a seperate function, then use subpub to subscribe????
    }
    pubsub.on('removeTask', removeTask);

    const moveTask = (task, anotherProject) => {
        removeTask(task);
        task.setProjectName(anotherProject);
        addNewTask(task, anotherProject);
    }

    const printOutProject = () => {
    }

    const getAllProjects = () => {
        return Array.from(projectMap.keys());
    }

    const getAllTasks = () => {
        let allTasksArray = [];
        let allArrayOfTasks = Array.from(projectMap.values());
        allArrayOfTasks.forEach(arrayOfTasks => {
            allTasksArray = allTasksArray.concat(arrayOfTasks);
        })
        return allTasksArray;
    }

    const getSizeOfProject = (projectName) => {
        return projectMap.get(projectName).length;
    }

    const getAllTasksOfSelectedProject = (projectName) => {
        return projectMap.get(projectName);
    }

    return {
        addNewTask, addNewProject, removeProject, printOutProject,
        getAllProjects, getSizeOfProject, getAllTasksOfSelectedProject,
        getAllTasks
    }
})()

const TasksManagerView = (() => {

    const listProjectsContainer = document.querySelector('.listProjectsContainer');
    const listOfTasksContainer = document.querySelector('.listOfTasks');

    const removeProjectView = () => {

    }

    const addProjectView = (projectName) => {


        const newProjectView = document.createElement('li');

        newProjectView.innerHTML = `
            <div class='confirmDeleteProject'>
                <div class ='confirmDelete'>Confirm</div>
                <div class ='cancelDelete'>Cancel</div>
            </div>
            <div data-numTasksOf = ${projectName}>0</div>
            <div>${projectName}</div>
            <div class = 'material-icons'>delete</div>
        `
        listProjectsContainer.append(newProjectView);
        return newProjectView;
    }

    const getDeleteProjectButtonView = (ProjectView) => {
        return newProjectView.lastElementChild;
    }

    const renderAllTasksOfSelectedProject = (tasks) => {
        clearAllTasksView();
        tasks.forEach((task) => {
            new TaskController(task);
        })
    }

    const currentTab = document.querySelector('#currentTab');
    const updateTilteOfTasksContainer = (currSelectedTab) => {
        currentTab.innerText = currSelectedTab;
    }


    //Update the number of tasks of each project
    const updateNumTaskView = (projectName, newNum) => {
        if (projectName !== 'Inbox') {
            const currNumTaskView = document.querySelector(`div[data-numTasksOf='${projectName}']`);
            console.log(currNumTaskView)
            // currNumTaskView.innerText = newNum;
        }
    }

    const clearAllTasksView = () => {
        while (listOfTasksContainer.firstElementChild) {
            listOfTasksContainer.firstElementChild.remove()
        }
    }

    return {
        addProjectView, renderAllTasksOfSelectedProject,
        updateTilteOfTasksContainer, updateNumTaskView, getDeleteProjectButtonView, clearAllTasksView
    }

})()

//Make the project view and data linked together=> easier to manipulate
const TasksManagerController = (() => {
    let currTabTasksData; //hold the data of current selected tab

    //switch to pick tab 
    const switchToTab = (ProjectName) => {
        TasksManagerView.updateTilteOfTasksContainer(ProjectName);
        currTabTasksData = TasksManagerModel.getAllTasksOfSelectedProject(ProjectName);
        TasksManagerView.renderAllTasksOfSelectedProject(currTabTasksData);
    }

    //Render all tasks list when a project get pick
    const createProjectDataAndView = (projectName) => {

        //If project name exist, then return
        if (!TasksManagerModel.addNewProject(projectName)) {
            alert('Project name already exists');
            return;
        };

        createAndBindProjectViewWithEvent(projectName);
    }

    const createAndBindProjectViewWithEvent = (projectName) => {
        const newProjectView = TasksManagerView.addProjectView(projectName);
        newProjectView.addEventListener('click', () => { switchToTab(projectName); })
        const deleteProjectButton = newProjectView.lastElementChild;

        const popupConfirm = newProjectView.firstElementChild;

        //Bind event to delete project button
        deleteProjectButton.addEventListener('click', (event) => {
            event.stopPropagation();
            popupConfirm.classList.add('active');
        })

        //Bind event to confirm to delete project or cancel to delete
        const cancelToDeleteButton = popupConfirm.lastElementChild;
        cancelToDeleteButton.addEventListener('click', (event) => {
            event.stopPropagation();
            popupConfirm.classList.remove('active');
        });

        const confirmToDeleteButton = popupConfirm.firstElementChild;
        confirmToDeleteButton.addEventListener('click', (event) => {
            event.stopPropagation();
            newProjectView.remove();
            pubsub.emit('removeProject', projectName);
            TasksManagerView.updateTilteOfTasksContainer(`Removed ${projectName}`);
            TasksManagerView.clearAllTasksView();
        })

        TasksManagerView.updateNumTaskView(projectName, TasksManagerModel.getSizeOfProject(projectName))
    }


    pubsub.on('addProject', createProjectDataAndView);

    //Update the number of tasks of each project view (the number show on the left of the project)
    const bindNumTaskViewToEvent = (task) => {
        TasksManagerView.updateNumTaskView(task.getProjectName(), TasksManagerModel.getSizeOfProject(task.getProjectName()));
    }
    pubsub.on('addTask', bindNumTaskViewToEvent);
    pubsub.on('removeTask', bindNumTaskViewToEvent);

    //When a task is added to a project, show the current content of that project
    const showCurrentTabContent = (task) => {
        switchToTab(task.getProjectName());
    }
    pubsub.on('addTask', showCurrentTabContent);

    //-----------------------------Home Tab, which shows all tasks from all project---------------------------------
    const homeTab = document.querySelector("li[data-tab='Home']");
    homeTab.addEventListener('click', () => {
        TasksManagerView.clearAllTasksView();
        currTabTasksData = TasksManagerModel.getAllTasks();
        currTabTasksData.forEach((task) => {
            new TaskController(task);
        })
    })


    //------------------------------Today Tab, which shows all tasks due today-------------------------------------
    const todayTab = document.querySelector("li[data-tab='Today']");
    todayTab.addEventListener('click', () => {
        TasksManagerView.updateTilteOfTasksContainer('Today')
        TasksManagerView.clearAllTasksView();
        const currTabTasksData = TasksManagerModel.getAllTasks().filter(task => dayjs(task.getDueDate()).isToday());
        TasksManagerView.renderAllTasksOfSelectedProject(currTabTasksData);
    })

    //------------------------------Week Tab, which shows all tasks due in the next 7 days----------------------
    const weekTab = document.querySelector("li[data-tab='Week']");
    weekTab.addEventListener('click', () => {
        TasksManagerView.updateTilteOfTasksContainer('Week');
        TasksManagerView.clearAllTasksView();
        const today = new Date();
        const currTabTasksData = TasksManagerModel.getAllTasks().filter((task) => {
            const dayDiff = (new Date(task.getDueDate()) - today) / 1000 / 60 / 60 / 24;
            if (dayDiff <= 7 && dayDiff >= 0) {
                return true;
            }
            return false;
        });
        TasksManagerView.renderAllTasksOfSelectedProject(currTabTasksData);
    })

    //------------------------Inbox Tab, which shows all tasks that does not belong to any project-----------------------------
    const inboxTab = document.querySelector("li[data-tab='Inbox']");
    inboxTab.addEventListener('click', () => {
        TasksManagerView.updateTilteOfTasksContainer('Inbox');
        TasksManagerView.clearAllTasksView();
        currTabTasksData = TasksManagerModel.getAllTasksOfSelectedProject('Inbox');
        TasksManagerView.renderAllTasksOfSelectedProject(currTabTasksData);
    })


    const sortDueDateButton = document.querySelector('.dueDateSort');
    sortDueDateButton.addEventListener('click', () => {
        sortDueDate(currTabTasksData);
        TasksManagerView.clearAllTasksView();
        currTabTasksData.forEach((task) => {
            new TaskController(task);
        })
    })

    const sortDueDate = (() => {
        let switchOrder = 1; // to toggle sorting from low->high or high->low
        return function (tasks) {
            switchOrder = switchOrder === 1 ? -1 : 1;
            tasks.sort((firstTask, secondTask) => {
                if (new Date(firstTask.getDueDate()) > new Date(secondTask.getDueDate())) {
                    return switchOrder;
                }
                return -switchOrder;
            })
        }
    })()

    //

    return { createAndBindProjectViewWithEvent }
})()






export { TasksManagerModel, TasksManagerView, TasksManagerController };