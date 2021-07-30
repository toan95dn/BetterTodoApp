import './style.css';
import './hamburger.css';
import './login.css';
import 'normalize.css'
import './login';
<<<<<<< HEAD
<<<<<<< HEAD
import { doc, getFirestore, collection, addDoc, updateDoc, getDoc, setDoc, arrayUnion } from "firebase/firestore";
=======
import { doc, getFirestore, collection, addDoc, updateDoc, getDoc, setDoc, arrayUnion, getDocs } from "firebase/firestore";
>>>>>>> addFirebase
=======
import { doc, getFirestore, collection, addDoc, updateDoc, getDoc, setDoc, arrayUnion, arrayRemove, getDocs, query, where, deleteDoc } from "firebase/firestore";
>>>>>>> addFirebase
import { onAuthStateChanged } from '@firebase/auth';
import { TaskModel, TaskView, TaskController } from './Task';
import { TasksManagerController, TasksManagerModel } from './TasksManager';
import { pubsub } from './pubsub';
import { getAuth } from 'firebase/auth';
<<<<<<< HEAD

console.log('hi')
=======
>>>>>>> addFirebase

//ALL BUTTONS TO ASK A TASK/PROJECT
const addButton = document.querySelector('#addButton');
const addTaskOptionButton = document.querySelector('.createTaskButtonContainer');
const addProjectOptionButton = document.querySelector('.createProjectButtonContainer');
const submitProjectButton = document.querySelector('#submitNewProject');
const submitTaskButton = document.querySelector('#submitNewTask');

//BUTTON TO MAKE THE MENU SLIDE OUT (SMALL SCREEN)
const hamburgerButton = document.querySelector('.hamburger');

// ALL CONTAINERS + POPUP
const menuTab = document.querySelector('.menu');
const listProjectsContainer = document.querySelector('.listProjectsContainer');
const listTasksContainer = document.querySelector('.listOfTasks');
const popupModalBg = document.querySelector('.popupModalBg');
const createProjectModal = document.querySelector('.createProjectModal');
const createTaskModal = document.querySelector('.createTaskModal');

//button to close

const closeTaskForm = document.querySelector('#closeTaskForm');
closeTaskForm.addEventListener('click', () => {
    popupModalBg.classList.remove('active');
    createTaskModal.classList.remove('active');
})

const closeProjectForm = document.querySelector('#closeProjectForm');
closeProjectForm.addEventListener('click', () => {
    popupModalBg.classList.remove('active');
    createProjectModal.classList.remove('active');
})

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
    addTaskOptionButton.classList.toggle('active');
    addProjectOptionButton.classList.toggle('active');
}

hamburgerButton.addEventListener('click', () => {
    hamburgerButton.classList.toggle('is-active');
    menuTab.classList.toggle('active');
})

//CREATE A NEW PROJECT
addProjectOptionButton.addEventListener('click', () => {
    popupModalBg.classList.add('active');
    createProjectModal.classList.add('active');
})

const inputProjectName = document.querySelector('#projectNameInput');
submitProjectButton.addEventListener('click', (e) => {
    e.preventDefault();
<<<<<<< HEAD

=======
>>>>>>> addFirebase
    const auth = getAuth();
<<<<<<< HEAD
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const uid = user.uid;
            const projectNamesRef = doc(db, "users", uid);
<<<<<<< HEAD
            const docProjectNames = await getDoc(projectNamesRef);
            if (docProjectNames.data().ProjectNames) {
                console.log('hi');
                // await setDoc(projectNamesRef, { Projectnames: ['Inbox'] });
            }
            // await updateDoc(projectNamesRef, { Projectnames: arrayUnion(inputProjectName.value) });
        }
    })


    /*await updateDoc(washingtonRef, {
    regions: arrayUnion("greater_virginia")
    }); */


    // TasksManagerModel.addNewProject(inputProjectName.value);
    pubsub.emit('addProject', inputProjectName.value);
    TasksManagerModel.printOutProject();
=======
            await updateDoc(projectNamesRef, { ProjectNames: arrayUnion(inputProjectName.value) });
            pubsub.emit('addProject', inputProjectName.value);
        }
    })
>>>>>>> addFirebase
=======
    const user = auth.currentUser;
    if (user) {
        const uid = user.uid;
        const projectNamesRef = doc(db, "users", uid);
        updateDoc(projectNamesRef, { ProjectNames: arrayUnion(inputProjectName.value) });
    }
>>>>>>> addFirebase

    pubsub.emit('addProject', inputProjectName.value);
    popupModalBg.classList.remove('active');
    createProjectModal.classList.remove('active');
})

//CREATE A NEW TASK
addTaskOptionButton.addEventListener('click', () => {
    getAllProjectsSelection();
    popupModalBg.classList.add('active');
    createTaskModal.classList.add('active');
})

//WHEN CLICK THE BUTTON TO POPUP FORM TO ADD TASK, PUT ALL THE POSSIBLE PROJECT TO THE PROJECT SELECTION
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


const db = getFirestore();
submitTaskButton.addEventListener('click', async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
        const uid = user.uid;
        const newTaskData = {
            title: inputTasksTitle.value, detail: inputDescription.value, dueDate: inputDueDate.value,
            priority: inputPriority.value, isDone: false, projectName: inputProjectSelection.value
        };

        const docRef = await addDoc(collection(db, "users", uid, "AllTasks"), newTaskData);
        const newTaskModel = new TaskModel(inputTasksTitle.value, inputDescription.value,
            inputDueDate.value, inputPriority.value, false, inputProjectSelection.value, docRef.id);
        const newController = new TaskController(newTaskModel);
        pubsub.emit('addTask', newTaskModel);
    } else {
        // User is signed out
        // ...
    }
    //title, detail, dueDate, priority, projectName
    createTaskModal.classList.remove('active');
    popupModalBg.classList.remove('active');
})

<<<<<<< HEAD
async function addTaskToFirebase() {

}

/////////////////////////////////////////
const syncManager = (() => {

    const getAllTasksFromFirebase = () => {

    }

    const getAllProjectsFromFirebase = () => {

    }

    const addTaskOnFireBase = async () => {


    }

    const removeTaskOnFireBase = () => {

    }

    const removeProjectOnFireBase = () => {

    }

    const updateListProjectOnFireBase = () => {

    }
})()



// const inputTaskTitle;
// const inputDescription;


// let m = (function addDemoProjectAndTask() {
//     pubsub.emit('addProject', '1stDemo');
//     pubsub.emit('addProject', '2ndDemo');
//     pubsub.emit('addProject', '3rdDemo');
//     pubsub.emit('addProject', '4thDemo');
//     pubsub.emit('addProject', '5thDemo');
//     pubsub.emit('addProject', '6thDemo');
// })()

// let k = (function addADemoTask() {
//     for (let i = 1; i < 12; i++) {
//         let currPri;
//         if (i % 2 === 0) {
//             currPri = 'High';
//         }
//         else {
//             currPri = i % 3 === 0 ? 'Low' : 'Medium';
//         }
//         const newTask = new TaskModel('Task_' + i + '_1stDemo', 'none', `2021-07-${i + 15}`, currPri, '1stDemo');
//         pubsub.emit('addTask', newTask)
//     }

//     for (let i = 1; i < 6; i++) {
//         const newTask = new TaskModel('Task_' + i + '_2ndDemo', 'none', `2021-${'0' + i}-10`, 'High', '2ndDemo');
//         pubsub.emit('addTask', newTask)
//     }
// })()


// IMPORTANT BUTTON -> BUTTONS THAT MODIFY BOTH DATA AND VIEW OR NEED DATA TO SHOW VIEW
//SUBMIT A TASK/PROJECT , DELETE A TASK/PROJECT, TAB HOME/TODAY/WEEK/A PROJECT, SORT BY TIME

<<<<<<< HEAD
=======
=======
>>>>>>> addFirebase

/*---------------------------------------Firebase stuff------------------------------------------------ */

/* Function to initialize the app */
const checkUserData = (() => { //If the user is new, then set a default project called Inbox for the user
    const auth = getAuth();

    onAuthStateChanged(auth, async (user) => {
        if (user) {

            const uid = user.uid;
            const userDocRef = doc(db, "users", uid);
            const docSnap = await getDoc(userDocRef);
            if (!docSnap.exists()) {//<---------This is the first time user
                await setDoc(userDocRef, { ProjectNames: ['Inbox'] });//set a default project
            }
            else {//<---------Not a first time user
                //Set all projects
                const allProjectNames = docSnap.data().ProjectNames;
                allProjectNames.forEach(projectName => {
                    TasksManagerModel.addNewProject(projectName);
                })

                //Set all tasks
                const querySnapshot = await getDocs(collection(db, "users", uid, "AllTasks"));

                querySnapshot.forEach((doc) => {
                    const currTaskData = doc.data();
                    const firebaseID = doc.id;
                    //convert data from firebase to local
                    const currTaskModel = new TaskModel(currTaskData.title, currTaskData.detail,
                        currTaskData.dueDate, currTaskData.priority, currTaskData.isDone, currTaskData.projectName, firebaseID);
                    TasksManagerModel.addNewTask(currTaskModel);
                });

                // Render all projects
                allProjectNames.forEach(projectName => {
                    if (projectName !== 'Inbox') {
                        TasksManagerController.createAndBindProjectViewWithEvent(projectName);
                    }
                })
            }
        }
    })
})()
>>>>>>> addFirebase

async function deleteProjectFireBase(projectName) {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
        const uid = user.uid;
        const projectNamesRef = doc(db, "users", uid);
        updateDoc(projectNamesRef, { ProjectNames: arrayRemove(projectName) });
        const queryAllTasksOfProject = query(collection(db, "users", uid, "AllTasks"), where("projectName", "==", projectName));
        const allTasksSnapshot = await getDocs(queryAllTasksOfProject);
        allTasksSnapshot.forEach((document) => {
            deleteDoc(doc(db, "users", uid, "AllTasks", document.id));
        })
    }
}

pubsub.on('removeProjectFireBase', deleteProjectFireBase);


function deleteTaskFireBase(task) {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
        const uid = user.uid;
        deleteDoc(doc(db, 'users', uid, "AllTasks", task.getFirebaseID()));
    }
}

pubsub.on('removeTaskFirebase', deleteTaskFireBase);

function updateTaskFireBase(task) {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
        const uid = user.uid;
        const taskRef = doc(db, "users", uid, "AllTasks", task.getFirebaseID());
        updateDoc(taskRef,
            {
                title: task.getTitle(), detail: task.getDetail(), dueDate: task.getDueDate(),
                priority: task.getPriority(), isDone: task.getStatus(), projectName: task.getProjectName()
            }
        );
    }
}

pubsub.on('updateTaskFirebase', updateTaskFireBase);






<<<<<<< HEAD
/* Function to initialize the app */
const initializeApp = (() => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const uid = user.uid;
            const projectNamesRef = doc(db, "users", uid);
            const docProjectNames = await getDoc(projectNamesRef);
            if (docProjectNames.data().ProjectNames === undefined) {
                await setDoc(projectNamesRef, { Projectnames: ['Inbox'] });
            }
            // await updateDoc(projectNamesRef, { Projectnames: arrayUnion(inputProjectName.value) });
        }
    })
})()
=======
>>>>>>> addFirebase
