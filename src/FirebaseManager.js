
import { initializeApp } from "firebase/app";
import { getAuth } from "@firebase/auth";
import { doc, getFirestore, collection, addDoc, updateDoc, getDoc, setDoc, arrayUnion, arrayRemove, getDocs, query, where, deleteDoc } from "firebase/firestore";
import { TasksManagerModel, TasksManagerController } from "./TasksManager";
import { TaskModel } from "./Task";
import { pubsub } from "./pubsub";

const firebaseConfig = {
    apiKey: "AIzaSyC-KTkKoCLeTWTRKKkjo1kKPysbXhlYnWg",
    authDomain: "todo-95d7e.firebaseapp.com",
    projectId: "todo-95d7e",
    storageBucket: "todo-95d7e.appspot.com",
    messagingSenderId: "623348448816",
    appId: "1:623348448816:web:6b0a6a3a6e952ea9b3f7f5",
    measurementId: "G-L6T216RN91"
};

initializeApp(firebaseConfig);

const FireBaseManager = (() => {
    const db = getFirestore();

    /* Function to initialize the app */
    const loadUserData = async (user) => { //If the user is new, then set a default project called Inbox for the user
        const uid = user.uid;
        const userDocRef = doc(db, "users", uid);
        const docSnap = await getDoc(userDocRef);
        if (!docSnap.exists()) {//<---------This is the first time user
            await setDoc(userDocRef, { ProjectNames: ['Inbox'] });//set a default project
            TasksManagerModel.addNewProject('Inbox');
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

            TasksManagerController.showHomeTaskContent();
        }
    }

    async function deleteProjectFireBase(projectName) {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
            const uid = user.uid;
            if (uid !== 'tUNpmmnXGdgMAUddvo97QXBathn2') {//This special ID is for Demo account, people can't touch the data of this account
                const projectNamesRef = doc(db, "users", uid);
                updateDoc(projectNamesRef, { ProjectNames: arrayRemove(projectName) });
                const queryAllTasksOfProject = query(collection(db, "users", uid, "AllTasks"), where("projectName", "==", projectName));
                const allTasksSnapshot = await getDocs(queryAllTasksOfProject);
                allTasksSnapshot.forEach((document) => {
                    deleteDoc(doc(db, "users", uid, "AllTasks", document.id));
                })
            }
        }
    }

    pubsub.on('removeProjectFireBase', deleteProjectFireBase);


    function deleteTaskFireBase(task) {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
            const uid = user.uid;
            if (uid !== 'tUNpmmnXGdgMAUddvo97QXBathn2') {//This special ID is for Demo account, people can't touch the data of this account
                deleteDoc(doc(db, 'users', uid, "AllTasks", task.getFirebaseID()));
            }
        }
    }

    pubsub.on('removeTaskFirebase', deleteTaskFireBase);

    function updateTaskFireBase(task) {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
            const uid = user.uid;
            if (uid !== 'tUNpmmnXGdgMAUddvo97QXBathn2') {//This special ID is for Demo account, people can't touch the data of this account
                const taskRef = doc(db, "users", uid, "AllTasks", task.getFirebaseID());
                updateDoc(taskRef,
                    {
                        title: task.getTitle(), detail: task.getDetail(), dueDate: task.getDueDate(),
                        priority: task.getPriority(), isDone: task.getStatus(), projectName: task.getProjectName()
                    }
                );
            }
        }
    }

    pubsub.on('updateTaskFirebase', updateTaskFireBase);

    function addProjectFirebase(newProjectName) {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
            const uid = user.uid;
            if (uid !== 'tUNpmmnXGdgMAUddvo97QXBathn2') {//This special ID is for Demo account, people can't touch the data of this account
                const projectNamesRef = doc(db, "users", uid);
                updateDoc(projectNamesRef, { ProjectNames: arrayUnion(newProjectName) });
            }
        }
    }

    async function addTaskFirebase(taskObj) {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
            const uid = user.uid;
            if (uid !== 'tUNpmmnXGdgMAUddvo97QXBathn2') {//This special ID is for Demo account, people can't touch the data of this account
                const docRef = await addDoc(collection(db, "users", uid, "AllTasks"), taskObj);
                return docRef.id;
            }
            else {
                return '1';
            }
        }
    }

    return { loadUserData, addTaskFirebase, addProjectFirebase }
})()

export { FireBaseManager }