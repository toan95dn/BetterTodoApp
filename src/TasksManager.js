import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
dayjs.extend(isToday);
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);
import weekday from "dayjs/plugin/weekday";
dayjs.extend(weekday);
import { pubsub } from "./pubsub";
import { TaskController } from "./Task";

const TasksManagerModel = (() => {
  const projectMap = new Map();

  const addNewProject = (projectName) => {
    if (!containsProjectname(projectName)) {
      projectMap.set(projectName, []);
      return true;
    }
    return false;
  };

  const containsProjectname = (projectName) => {
    return projectMap.has(projectName);
  };

  const removeProject = (projectName) => {
    projectMap.delete(projectName);
  };
  pubsub.on("removeProject", removeProject);

  const addNewTask = (task) => {
    const currTaskArray = projectMap.get(task.getProjectName());
    if (currTaskArray) {
      currTaskArray.push(task);
    }
  };
  pubsub.on("addTask", addNewTask);

  const removeTask = (task) => {
    const currProjectName = task.getProjectName();
    const listTasksOfCurrProject = projectMap.get(currProjectName);
    listTasksOfCurrProject.splice(listTasksOfCurrProject.indexOf(task), 1);
  };
  pubsub.on("removeTask", removeTask);

  const printOutProject = () => {};

  const getAllProjects = () => {
    return Array.from(projectMap.keys());
  };

  const getAllTasks = () => {
    let allTasksArray = [];
    let allArrayOfTasks = Array.from(projectMap.values());
    allArrayOfTasks.forEach((arrayOfTasks) => {
      allTasksArray = allTasksArray.concat(arrayOfTasks);
    });
    return allTasksArray;
  };

  const getSizeOfProject = (projectName) => {
    return projectMap.get(projectName).length;
  };

  const getAllTasksOfSelectedProject = (projectName) => {
    return projectMap.get(projectName);
  };

  const resetAllData = () => {
    projectMap.clear();
  };

  return {
    addNewTask,
    addNewProject,
    removeProject,
    containsProjectname,
    printOutProject,
    getAllProjects,
    getSizeOfProject,
    getAllTasksOfSelectedProject,
    getAllTasks,
    resetAllData,
  };
})();

const TasksManagerView = (() => {
  const projectViewMap = new Map();

  const listProjectsContainer = document.querySelector(
    ".listProjectsContainer"
  );
  const listOfTasksContainer = document.querySelector(".listOfTasks");

  const addProjectView = (projectName) => {
    const newProjectView = document.createElement("li");

    newProjectView.innerHTML = `
            <div class='confirmDeleteProject'>
                <div class ='confirmDelete'>Confirm</div>
                <div class ='cancelDelete'>Cancel</div>
            </div>
            <div class ='numTasks'}>0</div>
            <div>${projectName}</div>
            <div class = 'material-icons deleteProject'>delete</div>
        `;
    //TODO remove data-numTaskOf
    listProjectsContainer.append(newProjectView);

    projectViewMap.set(projectName, newProjectView);

    return newProjectView;
  };

  const renderAllTasksOfSelectedProject = (tasks) => {
    clearAllTasksView();
    tasks.forEach((task) => {
      new TaskController(task);
    });
  };

  const currentTab = document.querySelector("#currentTab");
  const updateTilteOfTasksContainer = (currSelectedTab) => {
    currentTab.innerText = currSelectedTab;
  };

  //Update the number of tasks of each project
  const updateNumTaskView = (projectName, newNum) => {
    if (projectName !== "Inbox") {
      const currProjectView = projectViewMap.get(projectName);
      const currNumTaskView = currProjectView.querySelector(".numTasks");
      currNumTaskView.innerText = newNum;
    }
  };

  const clearAllTasksView = () => {
    while (listOfTasksContainer.firstElementChild) {
      listOfTasksContainer.firstElementChild.remove();
    }
  };

  const clearAllProjectsView = () => {
    while (listProjectsContainer.firstElementChild) {
      listProjectsContainer.firstElementChild.remove();
    }
  };

  return {
    addProjectView,
    renderAllTasksOfSelectedProject,
    updateTilteOfTasksContainer,
    updateNumTaskView,
    clearAllTasksView,
    clearAllProjectsView,
  };
})();

//Make the project view and data linked together=> easier to manipulate
const TasksManagerController = (() => {
  let currTabTasksData; //hold the data of current selected tab

  //switch to pick tab
  const switchToTab = (ProjectName) => {
    TasksManagerView.updateTilteOfTasksContainer(ProjectName);
    currTabTasksData =
      TasksManagerModel.getAllTasksOfSelectedProject(ProjectName);
    TasksManagerView.renderAllTasksOfSelectedProject(currTabTasksData);
  };

  //Render all tasks list when a project get pick
  const createProjectDataAndView = (projectName) => {
    //If project name exist, then return
    if (!TasksManagerModel.addNewProject(projectName)) {
      return;
    }

    createAndBindProjectViewWithEvent(projectName);
  };

  const createAndBindProjectViewWithEvent = (projectName) => {
    const newProjectView = TasksManagerView.addProjectView(projectName);
    newProjectView.addEventListener("click", () => {
      switchToTab(projectName);
    });

    const deleteProjectButton = newProjectView.querySelector(".deleteProject");
    const popupConfirm = newProjectView.querySelector(".confirmDeleteProject");

    //Bind event to delete project button
    deleteProjectButton.addEventListener("click", (event) => {
      event.stopPropagation();
      popupConfirm.classList.add("active");
    });

    //Bind event to confirm to delete project or cancel to delete
    const cancelToDeleteButton = newProjectView.querySelector(".cancelDelete");
    cancelToDeleteButton.addEventListener("click", (event) => {
      event.stopPropagation();
      popupConfirm.classList.remove("active");
    });

    const confirmToDeleteButton =
      newProjectView.querySelector(".confirmDelete");
    confirmToDeleteButton.addEventListener("click", (event) => {
      event.stopPropagation();
      newProjectView.remove();
      pubsub.emit("removeProject", projectName);
      pubsub.emit("removeProjectFireBase", projectName);
      TasksManagerView.updateTilteOfTasksContainer(`Removed ${projectName}`);
      TasksManagerView.clearAllTasksView();
    });

    //Bind event to update the total tasks in each project view
    TasksManagerView.updateNumTaskView(
      projectName,
      TasksManagerModel.getSizeOfProject(projectName)
    );
  };

  pubsub.on("addProject", createProjectDataAndView);

  //Update the number of tasks of each project view (the number show on the left of the project)
  const bindNumTaskViewToEvent = (task) => {
    TasksManagerView.updateNumTaskView(
      task.getProjectName(),
      TasksManagerModel.getSizeOfProject(task.getProjectName())
    );
  };
  pubsub.on("addTask", bindNumTaskViewToEvent);
  pubsub.on("removeTask", bindNumTaskViewToEvent);

  //When a task is added to a project, show the current content of that project
  const showCurrentTabContent = (task) => {
    switchToTab(task.getProjectName());
  };
  pubsub.on("addTask", showCurrentTabContent);

  //-----------------------------Home Tab, which shows all tasks from all project---------------------------------
  const homeTab = document.querySelector("#Home");
  homeTab.addEventListener("click", () => {
    showHomeTaskContent();
  });
  const showHomeTaskContent = () => {
    TasksManagerView.updateTilteOfTasksContainer("Home");
    TasksManagerView.clearAllTasksView();
    currTabTasksData = TasksManagerModel.getAllTasks();
    currTabTasksData.forEach((task) => {
      new TaskController(task);
    });
  };

  //------------------------------Today Tab, which shows all tasks due today-------------------------------------
  const todayTab = document.querySelector("#Today");
  todayTab.addEventListener("click", () => {
    showTodayTabContent();
  });

  const showTodayTabContent = () => {
    TasksManagerView.updateTilteOfTasksContainer("Today");
    TasksManagerView.clearAllTasksView();
    const currTabTasksData = TasksManagerModel.getAllTasks().filter((task) =>
      dayjs(task.getDueDate()).isToday()
    );
    TasksManagerView.renderAllTasksOfSelectedProject(currTabTasksData);
  };

  //------------------------------Week Tab, which shows all tasks due in this week----------------------
  const weekTab = document.querySelector("#Week");
  weekTab.addEventListener("click", () => {
    showWeekTabContent();
  });

  const showWeekTabContent = () => {
    TasksManagerView.updateTilteOfTasksContainer("Week");
    TasksManagerView.clearAllTasksView();
    const currTabTasksData = TasksManagerModel.getAllTasks().filter((task) => {
      return dayjs(task.getDueDate()).isBetween(
        dayjs().weekday(0),
        dayjs().weekday(+7),
        "day",
        "(]"
      );
    });
    TasksManagerView.renderAllTasksOfSelectedProject(currTabTasksData);
  };

  //------------------------Inbox Tab, which shows all tasks that does not belong to any project-----------------------------
  const inboxTab = document.querySelector("#Inbox");
  inboxTab.addEventListener("click", () => {
    showInboxTabContent();
  });

  const showInboxTabContent = () => {
    TasksManagerView.updateTilteOfTasksContainer("Inbox");
    TasksManagerView.clearAllTasksView();
    currTabTasksData = TasksManagerModel.getAllTasksOfSelectedProject("Inbox");
    TasksManagerView.renderAllTasksOfSelectedProject(currTabTasksData);
  };

  const sortDueDateButton = document.querySelector(".dueDateSort");
  sortDueDateButton.addEventListener("click", () => {
    sortDueDate(currTabTasksData);
    TasksManagerView.clearAllTasksView();
    currTabTasksData.forEach((task) => {
      new TaskController(task);
    });
  });

  const sortDueDate = (() => {
    let switchOrder = 1; // to toggle sorting from low->high or high->low
    return function (tasks) {
      switchOrder = switchOrder === 1 ? -1 : 1;
      tasks.sort((firstTask, secondTask) => {
        if (
          new Date(firstTask.getDueDate()) > new Date(secondTask.getDueDate())
        ) {
          return switchOrder;
        }
        return -switchOrder;
      });
    };
  })();

  //
  const resetAllViewAndData = () => {
    TasksManagerView.clearAllProjectsView();
    TasksManagerView.clearAllTasksView();
    TasksManagerModel.resetAllData();
  };

  return {
    createAndBindProjectViewWithEvent,
    resetAllViewAndData,
    showHomeTaskContent,
  };
})();

export { TasksManagerModel, TasksManagerView, TasksManagerController };
