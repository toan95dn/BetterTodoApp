import { pubsub } from "./pubsub";
import { TaskController, TaskView } from "./Task";

const TasksManagerModel = (() => {
    //tasksMap is initialized with an empty project name, all tasks created without projectname will be put in
    const projectMap = new Map();
    projectMap.set('Inbox', []);

    const addNewProject = (projectName) => {
        projectMap.set(projectName, []);
    }
    pubsub.on('addProject', addNewProject);

    const addNewTask = (task) => {
        projectMap.get(task.getProjectName()).push(task);
    }
    pubsub.on('addTask', addNewTask);

    const removeTask = (task) => {
        const currProjectName = task.getProjectName();
        const listTasksOfCurrProject = projectMap.get(currProjectName);
        listTasksOfCurrProject.splice(listTasksOfCurrProject.indexOf(task), 1);
    }
    pubsub.on('removeTask', removeTask);

    const moveTask = (task, anotherProject) => {
        removeTask(task);
        task.setProjectName(anotherProject);
        addNewTask(task, anotherProject);
    }

    const printOutProject = () => {
        console.log(projectMap);
    }

    const getAllProjects = () => {
        return Array.from(projectMap.keys());
    }

    const getAllTasksOfSelectedProject = (projectName) => {
        return projectMap.get(projectName);
    }

    return { addNewTask, addNewProject, printOutProject, getAllProjects, getAllTasksOfSelectedProject }
})()

const TasksManagerView = (() => {

    const listProjectsContainer = document.querySelector('.listProjectsContainer');
    const listOfTasksContainer = document.querySelector('.listOfTasks');

    const removeProjectView = () => {

    }

    const addProjectView = (projectName) => {


        const newProjectView = document.createElement('li');
        const newNumTaskview = document.createElement('div');
        newProjectView.innerText = projectName;
        listProjectsContainer.append(newProjectView);

        return newProjectView;
    }



    const renderAllTasksOfSelectedProject = (tasks) => {
        clearAllTasksView();
        tasks.forEach((task) => {
            new TaskController(task, new TaskView(task.getTitle(), task.getDueDate()));
        })
    }

    //Update the number of tasks of each project
    const updateNumTaskView = () => {

    }

    const clearAllTasksView = () => {
        while (listOfTasksContainer.firstElementChild) {
            listOfTasksContainer.firstElementChild.remove()
        }
    }



    return { addProjectView, renderAllTasksOfSelectedProject }
})()

//Make the project view and data linked together=> easier to manipulate
const TasksManagerController = (() => {


    const bindNewProjectViewToEvent = (projectName) => {
        const newProjectView = TasksManagerView.addProjectView(projectName);
        newProjectView.addEventListener('click', () => {
            TasksManagerView.renderAllTasksOfSelectedProject(TasksManagerModel.getAllTasksOfSelectedProject(projectName));
        })
    }
    pubsub.on('addProject', bindNewProjectViewToEvent);




})()



export { TasksManagerModel, TasksManagerView, TasksManagerController };