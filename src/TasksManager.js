import { pubsub } from "./pubsub";

const TasksManagerModel = (() => {
    //tasksMap is initialized with an empty project name, all tasks created without projectname will be put in
    const projectMap = new Map();

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

    return { addNewTask, addNewProject, printOutProject, getAllProjects }
})()

const TasksManagerView = (() => {

    const ProjectsContainer = document.querySelector('.listProjectsContainer');

    const removeProjectView = () => {

    }

    const addProjectView = () => {

    }

    //Update the number of tasks of each project
    const updateNumTaskView = () => {

    }


})()

//Make the project view and data linked together=> easier to manipulate
const TasksManagerController = (() => {


})()



export { TasksManagerModel };