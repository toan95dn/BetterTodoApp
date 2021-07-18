const TasksManager = (() => {
    //tasksMap is initialized with an empty project name, all tasks created without projectname will be put in
    const tasksMap = new Map();
    tasksMap.set('', []);

    const addNewProject = (projectName) => {
        tasksMap.set(projectName, []);
    }

    const addNewTask = (task, projectName) => {
        tasksMap.get(projectName).push(task);
    }

    const removeTask = (task) => {
        const currProjectName = task.getProjectName();
        const listTasksOfCurrProject = tasksMap.get(currProjectName);
        listTasksOfCurrProject.splice(listTasksOfCurrProject.indexOf(task), 1);
    }

    const moveTask = (task, anotherProject) => {
        removeTask(task);
        task.setProjectName(anotherProject);
        addNewTask(task, anotherProject);
    }


})()

const TasksManagerView = (() => {

})

//Make the project view and data linked together=> easier to manipulate
const TaskManagerController = (() => {

})

export { TasksManager };