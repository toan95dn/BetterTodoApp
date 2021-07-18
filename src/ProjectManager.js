const ProjectManager = (() => {
    //tasksMap is initialized with an empty project name, all tasks created without projectname will be put in
    const projectMap = new Map();
    projectMap.set('', []);

    const addNewProject = (projectName) => {
        projectMap.set(projectName, []);
    }

    const addNewTask = (task, projectName) => {
        projectMap.get(projectName).push(task);
    }

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


})()

const ProjectManagerView = (() => {

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
const ProjectManagerController = (() => {


})()



export { ProjectManager };